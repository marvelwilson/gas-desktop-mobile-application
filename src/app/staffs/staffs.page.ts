import { Component, OnInit } from '@angular/core';
import { RopeService } from '../rope.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.page.html',
  styleUrls: ['./staffs.page.scss'],
})
export class StaffsPage implements OnInit {

  response: any;
  fname: any;
  lname: any;
  gender: any;
  position: any;
  username: any;
  password: any;
  staffs = [] ;
  bres: string;
  gres: string;

  constructor(
    public network: RopeService,
    private navCtrl: NavController) { 
    this.get_staffs();
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.get_staffs();
  }

  get_staffs(){
    this.network.get_staffs().subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      this.staffs = res;
      console.log(res);
    },(error: any) => {
      console.log("ERROR ===",error);
    });
  }

  create_staff(fn, ln, g, p, u, ps){
    this.bres = "";
    this.gres = '';
    if(!fn || !ln || !g || !p || !u || !ps){
      this.bres = "All fields are required";
    }else{
      let data = {
        fname: fn,
        lname: ln,
        gender: g,
        position: p,
        username: u,
        password: ps
      }
      this.network.create_staff(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        if(res == "bad"){
          this.bres="Something went wrong, please try again";
        }else{
          this.get_staffs();
          this.gres = 'success';
          this.fname = '';
          this.lname = '';
          this.gender = '';
          this.position = '';
          this.username = '';
          this.password = '';
        }
      },(error: any) => {
        console.log("ERROR ===",error);
      });
    }
  }

  done(){
    this.navCtrl.navigateBack('/admin-dashboard');
  }

}
