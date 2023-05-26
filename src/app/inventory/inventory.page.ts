import { Component, OnInit } from '@angular/core';
import { RopeService } from '../rope.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  response: any;
  title: any;
  price: any;
  wprice: any;
  dprice: any;
  cprice: any;
  inventories = [] ;
  gres: string;
  iqty: string;

  constructor(public network: RopeService) { 
    this.get_inventories();
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.get_inventories();
  }

  get_inventories(){
    this.network.get_inventories().subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      this.inventories = res;
      console.log(res);
    },(error: any) => {
      console.log("ERROR ===",error);
    });
  }

  create_inventory(t, cp, p, wp, dp,iq){
    this.response = "";
    this.gres = "";
    if(!t || !p || !wp || !dp || !cp || !iq){
      this.response = "All fields are required";
    }else{
      let data = {
        title: t,
        price: p,
        wprice: wp,
        dprice: dp,
        cprice: cp,
        iqty: iq
      }
      this.network.create_inventory(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        if(res == "bad"){
          this.response="Something went wrong, please try again";
        }else{
          this.get_inventories();
          this.gres = 'success';
          this.title = '';
          this.cprice = '';
          this.price = '';
          this.wprice = '';
          this.dprice = '';
          this.iqty = '';
        }
      },(error: any) => {
        console.log("ERROR ===",error);
      });
    }
  }

}
