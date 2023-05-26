import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { RopeService } from '../rope.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements AfterViewInit {
  gas_value: any;
  months = [];
  total = [];

  // Importing ViewChild. We need @ViewChild decorator to get a reference to the local variable 
  // that we have added to the canvas element in the HTML template.
  @ViewChild('barCanvas') private barCanvas: ElementRef;

  barChart: any;
  datay: any;
  response: string;

  constructor(public network: RopeService) { }

  ngAfterViewInit(): void {
    this.getmonthlysales();
  }

  ionViewDidEnter(){
    this.get_gas_value();
  }

  getmonthlysales() {
    this.network.getmonthlysales().subscribe((res:any) => {
      console.log(res);

      for (var y = 0; y < res.length; y++) {
        this.months.push(res[y].mname);
        this.total.push(res[y].total);
      }

      this.barchart();
    },(error: any) => {
      console.log("ERROR ===",error);
    });
  }

  getbardata(e) {
    this.network.getbardata(e).subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      console.log(res);

      if(res == 'none'){
        this.response = 'No record found';
      }else{
        this.months = [];
        this. total = [];
  
        for (var y = 0; y < res.length; y++) {
          this.months.push(res[y].mname);
          this.total.push(res[y].total);
        }
  
        this.barChart.destroy();
  
        this.barchart();
      }

      
    },(error: any) => {
      console.log("ERROR ===",error);
    });
  }

  barchart(){
    
    // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
          labels: this.months,
          datasets: [{
              label: 'total sales',
              data: this.total,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    });

    
  }

  get_gas_value(){
    this.network.get_gas_value().subscribe((res:any) => {
      console.log("SUCCESS ===",res);
      console.log(res);
      let gasv = res[0];
      this.gas_value = gasv.val;
    },(error: any) => {
      console.log("ERROR ===",error);
    });
  }

}
