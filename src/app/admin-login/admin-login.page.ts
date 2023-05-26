import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RopeService } from '../rope.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
})
export class AdminLoginPage implements OnInit {

  response: any;
  username: any;
  password: any;

  constructor(public network: RopeService, private router: Router) { }

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
      this.network.login(data).subscribe((res:any) => {
        // console.log("SUCCESS ===",res);
        if(res == "error"){
          this.response = "Username or Password is wrong";
        }else{
          this.router.navigate(['/admin-dashboard'])
          // console.log(res);
        }
      },(error: any) => {
        // console.log("ERROR ===",error);
        this.response = 'Error, something happened';
      });
    }
   
 }

}
