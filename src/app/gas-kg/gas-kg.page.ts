import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RopeService } from '../rope.service';

@Component({
  selector: 'app-gas-kg',
  templateUrl: './gas-kg.page.html',
  styleUrls: ['./gas-kg.page.scss'],
})
export class GasKgPage implements OnInit {

  gres: any;
  bres: any;
  ores: any;
  ogres: any;
  sync_c: any;
  sync_g: any;

  cprice: any;
  rprice: any;
  wprice: any;
  dprice: any;

  tcprice: any;
  trprice: any;
  twprice: any;
  tdprice: any;

  oprices: any;

  gprice: any;
  gas: any;
  gas_value: any;
  ogas_value: any;
  gasv = [] ;
  cylinders = [] ;

  constructor(
    private router: Router,
    public network: RopeService
  ) { 
    
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.get_gas_value();
    this.get_gas_value_online();
    this.get_pricesperkg();
    this.get_pricesperkg_online();
  }

  get_gas_value(){
    this.network.get_gas_value().subscribe((res:any) => {
      // console.log("SUCCESS ===",res);
      // console.log(res);
      let gasv = res[0];
      this.gas_value = gasv.val;
    },(error: any) => {
      console.log("ERROR ===",error);
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

  edit_gas(g){
    this.gres = "";
    this.bres = "";
    if(!g){
      this.bres = "All fields are required";
    }else{
      let data = {
        gas: g
      }
      this.network.edit_gas(data).subscribe((res:any) => {
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
    }
  }

  get_pricesperkg(){
    this.network.get_pricesperkg().subscribe((res:any) => {
      // console.log("SUCCESS ===",res);
      // console.log(res);
      let prices = res[0];
      this.cprice = prices.cprice;
      this.rprice = prices.rprice;
      this.wprice = prices.wprice;
      this.dprice = prices.dprice;

      this.tcprice = prices.cprice;
      this.trprice = prices.rprice;
      this.twprice = prices.wprice;
      this.tdprice = prices.dprice;
    },(error: any) => {
      this.bres = "Something went wrong";
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

  upprices(){
    if(this.gprice == '' || this.gprice == null){
      this.gprice = 0;
    }
    this.cprice = parseInt(this.tcprice) + parseFloat(this.gprice);
    this.rprice = parseInt(this.trprice) + parseInt(this.gprice);
    this.wprice = parseInt(this.twprice) + parseInt(this.gprice);
    this.dprice = parseInt(this.tdprice) + parseInt(this.gprice);
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



}
