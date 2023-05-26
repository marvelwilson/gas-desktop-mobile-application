import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RopeService } from '../rope.service';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.page.html',
  styleUrls: ['./staff-login.page.scss'],
})
export class StaffLoginPage implements OnInit {

  response: any;
  username: any;
  password: any;
  staffs = [] ;

  constructor(
    public network: RopeService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  login(n,p){
    this.response = "";
    if(!n || !p){
      this.response = "fill in username and password";
    }else{
      let data = {
        username: n,
        password: p
      }
      this.network.staff_login(data).subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        if(res == "error"){
          this.response="email or password is wrong";
        }else{
          localStorage.setItem('userid', JSON.stringify(res));
          this.router.navigate(['/staff-dashboard'])
          console.log(res);
        }
      },(error: any) => {
        console.log("ERROR ===",error);
      });
    }
   
 }

}
