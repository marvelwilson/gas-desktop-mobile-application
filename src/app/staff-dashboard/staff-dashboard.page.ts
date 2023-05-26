import { Component, OnInit } from '@angular/core';
import { RopeService } from '../rope.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.page.html',
  styleUrls: ['./staff-dashboard.page.scss'],
})
export class StaffDashboardPage implements OnInit {
  gas_value: any;
  userid: any;
  staff_name: any;
  staff_position: any;
  from: any;
  stored_history: any;
  to: any;
  history = [];
  sync_history = [];
  total = 0;
  kgt = 0;
  rst = 0;
  wst = 0;
  dst = 0;
  bres: any;
  gres: any;
  sale_filter: string = '';
  item_filter: string = '';
  isLoading = false;
  sync_res= '';
  sync_h: any;
  ogas_value: any;
  sync_g: string;
  ogres: string;
  gas: string;
  response='';
  constructor(
    public network: RopeService,
    public loadingController: LoadingController
  ) {
    this.userid = JSON.parse(localStorage.getItem('userid'));
    // console.log(this.userid);
  }

  ngOnInit() {
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
        // console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  ionViewDidEnter() {
    this.get_gas_value();
    this.get_staff_details();
    this.get_shistory();
    this.get_sync_history();
    this.get_gas_value_online();
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
  }

  get_gas_value() {
    this.network.get_gas_value().subscribe((res: any) => {
      // console.log("SUCCESS ===",res);
      // console.log(res);
      let gasv = res[0];
      this.gas_value = gasv.val;
    }, (error: any) => {
      console.log("ERROR ===", error);
    });
  }

  get_gas_value_online(){
    this.network.get_gas_value_online().subscribe((res:any) => {
      // console.log("SUCCESS ===",res);
      // console.log(res);
      let gasv = res[0];
      this.ogas_value = gasv.val;

      if(gasv.sync == 'No'){
        this.sync_g = "true";
      }
    },(error: any) => {
      // console.log("ERROR ===",error);
      this.ogres = "Check internet connection";
    });
  }

  sync_gas(){
    this.network.sync_gas_online().subscribe((res:any) => {
      // console.log("SUCCESS ===",res);
      // console.log(res);

      if(res == 'success'){
        this.sync_g = "false";
        let data = {
          gas: this.ogas_value
        }
        this.network.edit_g(data).subscribe((res:any) => {
          // console.log("SUCCESS ===",res);
          if(res == "bad"){
            this.bres = "Something went wrong, please try again";
          }else{
            this.gres = 'success';
            this.gas = '';
            this.get_gas_value();
          }
        },(error: any) => {
          this.bres = "Something went wrong";
        });
      }else{
        this.ogres = "Something went wrong, please try again";
      }
    },(error: any) => {
      this.ogres = "Check internet connection";
      // console.log("ERROR ===",error);
    });
  }

  get_staff_details() {
    this.network.get_staff(this.userid).subscribe((res: any) => {
      // console.log("SUCCESS ===",res);
      // console.log(res);
      let staff = res[0];
      this.staff_name = staff.fname + ' ' + staff.lname;
      this.staff_position = staff.position;
    }, (error: any) => {
      console.log("ERROR ===", error);
    });
  }

  get_shistory() {
    this.network.get_shistory(this.userid).subscribe((res: any) => {
      // console.log("SUCCESS ===",res);
      this.stored_history = res;
      this.history = this.stored_history;
      this.calc_total();
      // console.log(res);
    }, (error: any) => {
      console.log("ERROR ===", error);
    });
  }

  get_sync_history() {
    this.network.get_sync_history(this.userid).subscribe((res: any) => {
      this.sync_history = res;
      if(this.sync_history.length <= 0){
        this.sync_res = "Nothing to sync";
        this.sync_h = "true";
      }else{
        this.sync_res = "Something to sync";
        this.sync_h = "false";
      }
    }, (error: any) => {
      this.sync_res = "Check network availability";
    });
  }

  sync_db(){
    let data = {
      db:this.sync_history,
      table:'history'
    }
    this.network.sync_db(data).subscribe((res: any) => {
      if(res = "success"){
        this.sync_local();
        this.sync_res = "Data synced";
      }else{
        this.sync_res = "Data did not sync";
      }
    }, (error: any) => {
      this.sync_res = "Check network availability";
    });
  }

  sync_local(){
    this.network.sync_local(this.userid).subscribe((res: any) => {
      if(res = "success"){
        this.sync_res = "Nothing to sync";
      }else{
        this.sync_res = "Something to sync";
      }
    }, (error: any) => {
      this.sync_res = "Check network availability";
    });
  }



  search_shistory(f, t) {
    this.present();
    let data = {
      from: f,
      to: t,
      u: this.userid
    }
    this.network.search_shistory(data).subscribe((res: any) => {
      // console.log("SUCCESS ===",res);
      if (res == "error") {
        this.bres = "email or password is wrong";
        this.dismiss();
      } else {
        this.stored_history = res;
        this.history = res.sort((a, b) =>{
        });
        this.calc_total();
        this.dismiss();
      }
    }, (error: any) => {
      console.log("ERROR ===", error);
      this.dismiss();
    });
  }


  filter_history(d) {

    this.stored_history = this.history;

    if (this.sale_filter != '') {
      this.stored_history = this.stored_history.filter(record => record.sale === this.sale_filter);
      // console.log(this.history);
      this.calc_ftotal();
    }

    if (this.item_filter != '') {
      this.stored_history = this.stored_history.filter(record => record.type === this.item_filter);
      // console.log(this.history);
      this.calc_ftotal();
    }
  }

}
