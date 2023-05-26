import { Component, OnInit } from '@angular/core';
import { RopeService } from '../rope.service';
import { AnimationController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  response: any;
  staff_filter: string = '';
  type_filter: string = '';
  from: any;
  stored_history: any;
  to: any;
  history = [];
  staffs = [];
  total = 0;
  cusd: string = '';
  cuskg = 0;
  kgt = 0;
  item_filter: string = '';
  sale_filter: string = '';
  submitted = false

  constructor(
    public network: RopeService,
    public animationCtrl: AnimationController,
    public alertCtrl : AlertController,
  ) {

  }

  ngOnInit() {
  }

  //Modal animation start 
  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
  //modal animation end 

  //Update History
  async updateHistory(data){
     this.submitted=true;
     this.network.updateHistory(data).subscribe(async (res: any)=>{
      this.submitted=false;
      let alert =  await this.alertCtrl.create({
        header:res.header,
        message: res.message,
        buttons:['Ok']
       });
       
       alert.present()

      if (res.code=='1') {
        this.stored_history = res.data;
        this.history = this.stored_history;
        this.calc_total();
      }

     },async (error: any)=>{
      this.submitted=false;

       let alert =  await this.alertCtrl.create({
        header:error.statusText,
        message: error.errors.message
       });
       (await alert).present()
     });
  }
  ionViewDidEnter() {
    this.get_staffs();
    this.get_history();
  }

  calc_total() {
    this.total = 0;
    this.kgt = 0;
    for (var y = 0; y < this.history.length; y++) {
      this.total += parseFloat(this.history[y]['total']);

      if (this.history[y]['type'] == 'Gas') {
        this.kgt += parseFloat(this.history[y]['item']);
      }
    }

    this.total = Math.trunc(this.total * 100) / 100;
  }

  calc_ftotal() {
    this.total = 0;
    this.kgt = 0;
    for (var y = 0; y < this.stored_history.length; y++) {
      this.total += parseFloat(this.stored_history[y]['total']);

      if (this.stored_history[y]['type'] == 'Gas') {
        this.kgt += parseFloat(this.stored_history[y]['item']);
      }
    }

    this.total = Math.trunc(this.total * 100) / 100;
  }

  get_staffs() {
    this.network.get_staffs().subscribe((res: any) => {
      // console.log("SUCCESS ===",res);
      this.staffs = res;
      // console.log(res);
    }, (error: any) => {
      console.log("ERROR ===", error);
    });
  }

  groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      let key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
  }

  get_history() {
    this.network.get_history().subscribe((res: any) => {
      // console.log("SUCCESS ===",res);
      this.stored_history = res;
      this.history = this.stored_history.sort((a, b)=>{
        return parseInt(b.item) - parseInt(a.item);
      });
      this.calc_total();

    }, (error: any) => {
      console.log("ERROR ===", error);
    });
  }

  search_history(f, t) {
    let data = {
      from: f,
      to: t
    }
    this.network.search_history(data).subscribe((res: any) => {
      // console.log("SUCCESS ===",res);
      if (res == "error") {
        this.response = "email or password is wrong";
      } else {
        this.stored_history = res;
        this.history = res;
        this.calc_total();
        console.log(this.history);
      }
    }, (error: any) => {
      console.log("ERROR ===", error);
    });
  }



  filter_history(d) {

    this.stored_history = this.history;

    if (this.staff_filter != '') {
      this.stored_history = this.stored_history.filter(record => record.user === this.staff_filter);
      // console.log(this.history);
      this.calc_ftotal();
    }

    if (this.type_filter != '') {
      this.stored_history = this.stored_history.filter(record => record.type === this.type_filter);
      // console.log(this.history);
      this.calc_ftotal();
    }

    if (this.cusd != '') {
      this.stored_history = this.stored_history.filter(record => record.cphone === this.cusd);
      // console.log(this.history);
      this.calc_ftotal();
    }

    if (this.item_filter != '') {
      this.stored_history = this.stored_history.filter(record => record.type === this.item_filter);
      // console.log(this.history);
      this.calc_ftotal();
    }

    if (this.sale_filter != '') {
      this.stored_history = this.stored_history.filter(record => record.sale === this.sale_filter);
      // console.log(this.history);
      this.calc_ftotal();
    }

    if (this.cuskg != 0) {
      let groupedrecord = this.groupBy(this.stored_history, 'cphone');
      // console.log(groupedPeople);

      // console.log('length = ' + Object.keys(groupedPeople).length);

      const keys = Object.keys(groupedrecord);
      let ep = [];

      keys.forEach((key, index) => {
        // console.log(`${key}: ${groupedPeople[key]}`);

        let tl = 0;
        let qt = 0;
        let kg = 0;
        let cname = '';

        for (var i = 0; i < groupedrecord[key].length; i++) {
          if (groupedrecord[key][i].type == 'Gas' && groupedrecord[key][i].cphone != '') {
            tl += parseInt(groupedrecord[key][i].total);
            qt += parseInt(groupedrecord[key][i].quantity);
            kg += parseInt(groupedrecord[key][i].item);
            cname = groupedrecord[key][i].cname;
          }


        }
        if (kg <= this.cuskg) {
          ep.push({ 'type': 'Gas', 'cphone': key, 'item': kg, 'quantity': qt, 'total': tl, cname: cname });
        }

        this.stored_history = ep.sort((a, b)=>{
            return parseInt(b.item) - parseInt(a.item)
        });

      });
      this.calc_ftotal();
    }
  }

  del (id) {
     this.network.del(id).subscribe((res)=>{
         this.get_history()
     },(error)=>{

     })
  }

}
