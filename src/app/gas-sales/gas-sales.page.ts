import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RopeService } from '../rope.service';

@Component({
  selector: 'app-gas-sales',
  templateUrl: './gas-sales.page.html',
  styleUrls: ['./gas-sales.page.scss'],
})
export class GasSalesPage implements OnInit {

  bres: any;
  gres: any;
  tag: any = '';
  type: any = 0;
  cylinder: any;
  gprice: any;
  gqty: any;
  item: any;
  aprice: any;
  aqty: any;
  cname: any = '';
  cphone: any = '';
  amt_ten: any = 0;
  chng: any = 0;
  cprice: any;
  rprice: any;
  wprice: any;
  dprice: any;
  acprice: any;
  arprice: any;
  awprice: any;
  adprice: any;
  userid: any;
  inventories = [];
  priceperkg = [];
  cylinders = [];
  sales = [];
  finalsales = [];
  i: any;
  t: any = 0;
  sale: any;
  tag_no: any;
  customer = [];
  itemprices = [];
  comname: any;
  comphone: any;
  comemail: any;
  comaddress: any;
  lastday = 0;
  lastmnth = 0;
  lastyr = 0;
  today: any;
  ref: number;
  fname: any;
  time: any;
  gas_value: any;
  st: any;
  oprices: any;
  sync_c: string;
  ores: string;

  constructor(
    private router: Router,
    public network: RopeService
  ) {
    this.userid = JSON.parse(localStorage.getItem('userid'));
  }

  ngOnInit() {
    this.get_inventories();
    this.get_pricesperkg();
    this.get_pricesperkg_online();
    this.get_info();
    this.get_staff();
    this.adddate();
    this.get_gas_value();
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

  get_staff() {
    this.userid = JSON.parse(localStorage.getItem('userid'));
    this.network.get_staff(this.userid).subscribe((res: any) => {
      // console.log("SUCCESS ===",res);
      // console.log(res);
      let staff = res[0];
      this.fname = staff.fname;
    }, (error: any) => {
      console.log("ERROR ===", error);
    });
  }

  get_info() {
    this.network.get_info().subscribe((res: any) => {
      // console.log("SUCCESS ===", res);
      // console.log(res);
      let info = res[0];
      this.comname = info.name;
      this.comphone = info.phone;
      this.comemail = info.email;
      this.comaddress = info.address;
    }, (error: any) => {
      console.log("ERROR ===", error);
    });
  }

  getpast(t) {
    this.network.getpast(t).subscribe((res: any) => {
      // console.log("SUCCESS ===", res);

      // console.log(res);
      this.lastday = res.day;
      this.lastmnth = res.mth;
      this.lastyr = res.yr;
    }, (error: any) => {
      console.log("ERROR ===", error);
    });
  }

  check_tag_no(t) {
    this.bres = "";
    this.gres = "";
    this.cname = "";
    this.cphone = "";
    if (!t) {
      this.bres = "Enter tag nos";
    } else {
      this.network.check_tag_no(t).subscribe((res: any) => {
        // console.log("SUCCESS ===", res);
        if (res != 'empty') {
          let customer = res[0];
          this.cname = customer.name;
          this.cphone = customer.phone;

          this.getpast(t);
        } else {
          this.bres = "No customer with this tag number";
        }

        // console.log(res);
      }, (error: any) => {
        console.log("ERROR ===", error);
      });
    }
  }

  get_pricesperkg() {

    this.network.get_pricesperkg().subscribe((res: any) => {
      // console.log("SUCCESS ===", res);
      // console.log(res);
      let prices = res[0];
      this.cprice = prices.cprice;
      this.rprice = prices.rprice + '---Retail';
      this.wprice = prices.wprice + '---Wholesale';
      this.dprice = prices.dprice + '---Discount';
    }, (error: any) => {
      console.log("ERROR ===", error);
    });
  }

  get_pricesperkg_online(){
    this.network.get_pricesperkg_online().subscribe((res:any) => {
      // console.log("SUCCESS ===",res);
      // console.log(res);
      this.oprices = res[0];

      if(this.oprices.sync == 'No'){
        this.sync_c = "true";
      }
    },(error: any) => {
      this.ores = "Check internet connection";
      // console.log("ERROR ===",error);
    });
  }

  sync_cylinder(){
    this.network.sync_cy_online().subscribe((res:any) => {
      // console.log("SUCCESS ===",res);
      // console.log(res);

      if(res == 'success'){
        this.sync_c = "false";
        this.edit_gaspricesperkg(this.oprices.cprice, this.oprices.rprice, this.oprices.wprice, this.oprices.dprice);
        this.get_pricesperkg();
      }else{
        this.ores = "Something went wrong, please try again";
      }
    },(error: any) => {
      this.ores = "Check internet connection";
      // console.log("ERROR ===",error);
    });
  }

  edit_gaspricesperkg(cp, rp, wp, dp){
    this.bres = "";
    this.gres = "";
    if(!cp){
      this.bres = "All fields are required";
    }else{
      let data = {
        cp: cp,
        rp: rp,
        wp: wp,
        dp: dp
      }
      this.network.edit_gaspricesperkg(data).subscribe((res:any) => {
        // console.log("SUCCESS ===",res);
        if(res == "bad"){
          this.bres="Something went wrong, please try again";
        }else{
          this.gres = 'success';
        }
      },(error: any) => {
        // console.log("ERROR ===",error);
        this.bres="Something went wrong, please try again";
      });
    }
  }

  get_inventories() {
    this.network.get_inventories().subscribe((res: any) => {
      // console.log("SUCCESS ===", res);
      this.inventories = res;
      // console.log('ivn '+this.inventories);
    }, (error: any) => {
      console.log("ERROR ===", error);
    });
  }

  calc_gp_kg() {
    this.gprice = 0;
    this.cylinder = 0;
    this.gqty = 0;
  }

  calc_t() {
    this.t = 0;
    if (this.finalsales.length >= 1) {
      for (var y = 0; y < this.finalsales.length; y++) {
        this.t += this.finalsales[y].qty * this.finalsales[y].price
      }
    }
  }

  calc_gp() {
    let myArr = this.type.split("---");
    this.st = myArr[1];
    if (myArr[0] == 0) {
      this.bres = 'Please select price type above';
    } else {
      this.gprice = myArr[0] * this.cylinder;
    }
  }

  calc_kg() {
    let myArr = this.type.split("---");
    this.st = myArr[1];
    if (myArr[0] == 0) {
      this.bres = 'Please select price type above';
    } else {
      this.cylinder = this.gprice / myArr[0];
    }
  }

  getitemprices() {

    if (this.item != '' || this.item != 'undefined') {
      this.itemprices = this.inventories.filter(record => record.id === this.item);
      this.arprice = this.itemprices[0].price;
      this.awprice = this.itemprices[0].wprice;
      this.adprice = this.itemprices[0].dprice;
    }
  }

  gassales(t, c, gp, gq) {
    this.bres = '';
    this.gres = '';
    if (!c || !gp || !gq) {
      this.bres = 'Enter all fields';
    } else if (parseInt(c) > this.gas_value) {
      this.bres = 'Insufficient gas quantity'
    } else {
      let nc = Math.trunc(c * 100) / 100;
      let ngp = Math.trunc(gp * 100) / 100;
      let sale = {
        sale: this.st,
        type: 'Gas',
        item: nc,
        price: ngp,
        qty: gq
      }

      this.finalsales.push(sale);

      this.calc_t();
    }



  }

  ivnsales(i, ap, aq) {
    this.bres = '';
    this.gres = '';
    if (!i || !ap || !aq) {
      this.bres = 'Enter all fields';
    } else if (parseInt(aq) > parseInt(this.itemprices[0].quantity)) {
      this.bres = "Out of stock " + this.itemprices[0].quantity + " left";
    } else {
      let myArr = ap.split("---");
      this.st = myArr[1];
      let sale = {
        sale: this.st,
        type: 'Accessory',
        item: this.itemprices[0].title,
        price: myArr[0],
        qty: aq,
        idd: this.itemprices[0].id
      }

      this.finalsales.push(sale);

      this.calc_t();
    }



  }

  removeitem(i) {

    this.finalsales.splice(i, 1);

    this.calc_t();

    this.calc_t();
  }

  openm() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }

  closem() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  adddate() {
    this.today = new Date();
    var dd = String(this.today.getDate()).padStart(2, '0');
    var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = this.today.getFullYear();

    this.time = new Date();
    this.time = this.time.getHours() + ":" + this.time.getMinutes() + ":" + this.time.getSeconds();

    this.today = mm + '/' + dd + '/' + yyyy;
  }

  conf() {
    this.bres = '';
    this.gres = '';
    if (this.finalsales.length <= 0) {
      this.bres = 'You have nothing in the cart';
    } else if (this.amt_ten == '') {
      this.bres = 'Enter amount tendered and change given';
    } else {
      var d = new Date();
      var n = d.getTime();
      this.ref = n;
      let data = {
        data: this.finalsales,
        userid: this.userid,
        cname: this.cname,
        cphone: this.cphone,
        amt_ten: this.amt_ten,
        chng: this.chng,
        ref: n,
        tag: this.tag
      }
      this.network.conf(data).subscribe((res: any) => {
        // console.log("SUCCESS ===", res);
        if (res == "bad") {
          this.bres = "Something went wrong, please try again";
        } else {
          this.gres = 'success';
          this.adddate();
          this.openm();
          window.print();
          this.finalsales = [];
          this.reset();
          this.closem();
          this.gres = 'Success';
        }
      }, (error: any) => {
        console.log("ERROR ===", error);
      });
    }
  }

  conff() {
    this.bres = '';
    this.gres = '';
    if (this.finalsales.length <= 0) {
      this.bres = 'You have nothing in the cart';
    } else if (this.amt_ten == '') {
      this.bres = 'Enter amount tendered and change given';
    } else {
      var d = new Date();
      var n = d.getTime();
      this.ref = n;
      let data = {
        data: this.finalsales,
        userid: this.userid,
        cname: this.cname,
        cphone: this.cphone,
        amt_ten: this.amt_ten,
        chng: this.chng,
        ref: n,
        tag: this.tag
      }
      this.network.conf(data).subscribe((res: any) => {
        // console.log("SUCCESS ===", res);
        if (res == "bad") {
          this.bres = "Something went wrong, please try again";
        } else {
          this.gres = 'success';
          this.adddate();
          this.openm();
          this.finalsales = [];
          this.calc_t();
          this.reset();
          this.closem();
          this.gres = 'Success';
        }
      }, (error: any) => {
        console.log("ERROR ===", error);
      });
    }
  }
  reset() {
    this.type = 0;
    this.cylinder = '';
    this.gprice = 0;
    this.gqty = 0;
    this.amt_ten = 0;
    this.chng = 0;
    this.aprice = 0;
    this.aqty = 0;
    this.tag = '';
    this.cname = '';
    this.cphone = '';
    this.lastday = 0;
    this.lastmnth = 0;
    this.lastyr = 0;
    this.item = '';
  }

}
