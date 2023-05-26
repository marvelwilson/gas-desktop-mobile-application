import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RopeService } from '../rope.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.page.html',
  styleUrls: ['./edit-inventory.page.scss'],
})
export class EditInventoryPage implements OnInit {

  id: any;
  title: any;
  price: any;
  wprice: any;
  dprice: any;
  cprice: any;
  quantity: any;
  gres: any;
  bres: any;
  inventory = [] ;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public network: RopeService,
    private navCtrl: NavController
  ) { 
    this.route.params.subscribe((param:any) => {
      this.id = param.id;
      console.log(this.id);
      this.get_inventory();
    })
  }

  ngOnInit() {
  }

  get_inventory(){
    this.network.get_inventory(this.id).subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      console.log(res);
      let inventory = res[0];
      this.title = inventory.title;
      this.cprice = inventory.cprice;
      this.price = inventory.price;
      this.wprice = inventory.wprice;
      this.dprice = inventory.dprice;
    },(error: any) => {
      console.log("ERROR ===",error);
    });
  }

  edit_inventory(t, cp, p, wp, dp, q){
    this.gres = "";
    this.bres = "";
    if(!t || !p || !wp || !dp || !cp){
      this.bres = "All fields are required";
    }else{
      let data = {
        title: t,
        price: p,
        wprice: wp,
        dprice: dp,
        cprice: cp,
        quantity: q,
        id: this.id
      }
      this.network.edit_inventory(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        if(res == "bad"){
          this.bres="Something went wrong, please try again";
        }else{
          this.gres = 'success';
          this.title = '';
          this.price = '';
          this.wprice = '';
          this.dprice = '';
          this.cprice = '';
          this.quantity = '';
          this.navCtrl.navigateBack(['/inventory'])
        }
      },(error: any) => {
        console.log("ERROR ===",error);
      });
    }
  }

  delete_inventory(){
    let data = {
      id: this.id
    }
    this.network.delete_inventory(data).subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      if(res == "bad"){
        this.bres="Something went wrong, please try again";
      }else{
        this.gres = 'success';
        this.router.navigate(['/inventory'])
      }
    },(error: any) => {
      console.log("ERROR ===",error);
    });
  }

}
