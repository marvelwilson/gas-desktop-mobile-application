import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RopeService } from '../rope.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.page.html',
  styleUrls: ['./edit-staff.page.scss'],
})
export class EditStaffPage implements OnInit {

  id: any;
  fname: any;
  lname: any;
  gender: any;
  position: any;
  username: any;
  password: any;
  gres: any;
  bres:any;
  staff = [] ;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public network: RopeService,
    private navCtrl: NavController
    ) { 
      this.route.params.subscribe((param:any) => {
        this.id = param.id;
        console.log(this.id);
        this.get_staff();
      })
    }

  ngOnInit() {
  }

  get_staff(){
    this.network.get_staff(this.id).subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      console.log(res);
      let staff = res[0];
      this.fname = staff.fname;
      this.lname = staff.lname;
      this.gender = staff.gender;
      this.position = staff.position;
      this.username = staff.username;
      this.password = staff.password;
    },(error: any) => {
      console.log("ERROR ===",error);
    });
  }


  edit_staff(fn, ln, g, p, u, ps){
    this.gres = "";
    this.bres = "";
    if(!fn || !ln || !g || !p || !u || !ps){
      this.bres = "All fields are required";
    }else{
      let data = {
        fname: fn,
        lname: ln,
        gender: g,
        position: p,
        username: u,
        password: ps,
        id: this.id
      }
      this.network.edit_staff(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        if(res == "bad"){
          this.bres="Something went wrong, please try again";
        }else{
          this.gres = 'success';
          this.fname = '';
          this.lname = '';
          this.gender = '';
          this.position = '';
          this.username = '';
          this.password = '';
          this.navCtrl.navigateBack(['/staffs']);
        }
      },(error: any) => {
        console.log("ERROR ===",error);
      });
    }
  }

  delete_staff(){
    this.gres = '';
    this.bres = '';
    let data = {
      id: this.id
    }
    this.network.delete_staff(data).subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      if(res == "bad"){
        this.bres = "Something went wrong, please try again";
      }else{
        this.gres = 'success';
        this.navCtrl.navigateBack(['/staffs']);
      }
    },(error: any) => {
      console.log("ERROR ===",error);
    });
  }

  done(){
    this.navCtrl.navigateBack('/staffs');
  }

}
