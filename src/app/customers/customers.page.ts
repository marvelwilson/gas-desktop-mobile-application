import { Component, OnInit } from '@angular/core';
import { RopeService } from '../rope.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  customers: any;
  cusd: any;

  constructor(
    public network: RopeService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.get_customers();
  }

  get_customers(){
    this.network.get_customers().subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      this.customers = res;
      console.log(res);
    },(error: any) => {
      console.log("ERROR ===",error);
    });
  }

  get_customer(){
    this.network.get_customer(this.cusd).subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      this.customers = res;
      console.log(res);
    },(error: any) => {
      console.log("ERROR ===",error);
    });
  }

}
