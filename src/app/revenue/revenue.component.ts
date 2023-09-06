// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component } from '@angular/core';
import { RevenueService } from '../service/revenue.service';
import { ChartOptions, ChartDataset, ChartType } from 'chart.js';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent {

  constructor(private revenueService:RevenueService){}

  result:any = [];
  selectedMonth = "1";
  allDaysList:{day:string, totalRevenue:number}[] = [];
  flag:boolean;
  

  ngOnInit(): void {
    this.updateChart("Day");
  }

  filterByMonth(selectedMonth:string){
    this.allDaysList = [];
    let formattedSelectedMonth = selectedMonth.padStart(2, '0');
    console.log(formattedSelectedMonth);
    this.revenueService.getGraphByMonth(formattedSelectedMonth).subscribe(res=>{
      this.result = res;
      console.log(this.result);

      if(this.result.length > 0){
        const year = 2023;
        const numDays = new Date(year, parseInt(selectedMonth), 0).getDate();

        for(let i = 1; i <= numDays; i++){
          this.flag = false;
          let formattedDay = i.toString().padStart(2, '0');
          console.log(formattedDay);
          for(let j = 0; j < this.result.length; j++){
            if(this.result[j].BookingDate == "2023-" + formattedSelectedMonth + "-" + formattedDay){
              this.flag = true;
              this.allDaysList.push({
                day: i.toString(),
                totalRevenue: parseFloat(this.result[j].occurrences)
              });
              break;
            }
          }
          if(!this.flag){   //if the particular day of the month does not have any revenue
            this.allDaysList.push({
              day: i.toString(),
              totalRevenue:0
            });
          }
        }
        console.log(this.allDaysList);
        this.updateChart("Day");
      }else{
        this.allDaysList = [];
        this.updateChart("Day");
      }
    })
  }

  //Chart.js with ng2-chart
    // chart options
    public barChartOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales:{
        x:{
          title:{
            display:true,
            text: 'Days',
            font:{
              size:16,
              weight:'bold'
            }
          },
        },
      },
      indexAxis: "x",
      plugins:{
        title: {
          display: true,
          text: 'A Bar Chart of Total Revenue Against Days',
          font: {
            size:18,
            family: 'Times New Roman'
          }
        },
      },
      backgroundColor: 'rgba(173, 216, 230, 0.5)',
    };

    public barChartData: ChartDataset[];
    public barChartLabels:string[];
    public barChartType: ChartType= 'bar';
    public barChartLegend = true;


    updateChart(filter:string){
      if(filter == "Day"){
        var dataset = this.allDaysList.map(item => item.totalRevenue);
        var labels = this.allDaysList.map(item => item.day);
        var xText = "Days";
        var title = "A Bar Chart of Total Revenue Against Days";
      }
      else{
        var dataset = this.allMonthsList.map(item => item.totalRevenue);
        var labels = this.allMonthsList.map(item => item.month);
        var xText = "Months";
        var title = "A Bar Chart of Total Revenue Against Months of Year 2023";
      }

      this.barChartData = [
        {
          data: dataset, 
          label: 'Total Revenue',
          backgroundColor: 'rgba(255, 90, 130, 0.2)',
          borderColor: 'rgba(255, 92, 132, 1)',
          borderWidth: 1,
          borderRadius: 5,
          barPercentage:0.7,
        }
      ];

      this.barChartLabels = labels;

      this.barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales:{
          x:{
            title:{
              display:true,
              text: xText,
              font:{
                size:16,
                weight:'bold'
              }
            },
          },
        },
        indexAxis: "x",
        plugins:{
          title: {
            display: true,
            text: title,
            font: {
              size:18,
              family: 'Times New Roman'
            }
          },
        },
      };
    }

    allMonthsList:{month:string, totalRevenue:number}[] = [];

    monthNameList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    filterByYear(){
      this.allMonthsList = [];
      this.revenueService.getGraphByYear().subscribe(res=>{
        this.result = res;
        console.log(this.result);

        for(let i = 0; i < this.monthNameList.length; i++){
          this.flag = false;
          for(let j = 0; j < this.result.length; j++){
            if(i+1 == parseInt(this.result[j].monthNo)){
              this.flag = true;
              this.allMonthsList.push({
                month: this.monthNameList[i],
                totalRevenue: parseFloat(this.result[j].occurrences)
              });
              break;
            }
          }
          if(!this.flag){   //if the particular month does not have any revenue
            this.allMonthsList.push({
              month: this.monthNameList[i],
              totalRevenue: 0
            })
          }
        }
        console.log(this.allMonthsList);
        this.updateChart("Year");
      })  
    }
}
