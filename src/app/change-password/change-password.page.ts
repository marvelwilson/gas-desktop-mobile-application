import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RopeService } from '../rope.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  oldp: any;
  newp: any;
  cnewp: any;
  gres: any;
  bres: any;

  constructor(
    private router: Router,
    public network: RopeService
  ) { }

  ngOnInit() {
  }

  change_passowrd(o, n, cn) {
    this.bres = '';
    this.gres = '';
    if (!o || !n || !cn) {
      this.bres = 'All fields must be filled';
    } else {
      let data = {
        oldp: o,
        newp: n,
        cnewp: cn
      }
      this.network.change_passowrd(data).subscribe((res: any) => {
        console.log("SUCCESS ===", res);
        if(res == 'old'){
          this.bres = 'Your current password is wrong';
        } else if(res == 'new'){
          this.bres = 'Your current passwords do not match';
        }else if(res == 'success'){
          this.gres = 'You changed admin password successfully!';
        }
      }, (error: any) => {
        console.log("ERROR ===", error);
      });
    }

  }

}
