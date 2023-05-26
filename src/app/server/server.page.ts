import { Component, OnInit } from '@angular/core';
import { RopeService } from '../rope.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.page.html',
  styleUrls: ['./server.page.scss'],
})
export class ServerPage implements OnInit {

  ip: any;
  gres: any;
  bres: string;

  constructor(
    public network: RopeService
  ) { }

  ngOnInit() {
    this.ip = JSON.parse(localStorage.getItem('ip'));
  }

  edit_server(n){
    this.gres = '';
    this.bres = '';
    if(!n){
      this.bres = "All fields are required";
    }else{
      localStorage.setItem('ip', JSON.stringify(n));
      this.gres = 'Ip set successfully';
    }
  }

}
