// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataset, ChartType } from 'chart.js';
import { RoomUsageService } from 'src/app/service/room-usage.service';

@Component({
  selector: 'app-graph-room',
  templateUrl: './graph-room.component.html',
  styleUrls: ['./graph-room.component.css']
})
export class GraphRoomComponent implements OnInit{

  constructor(private roomUsageService:RoomUsageService){}

  result:any = [];
  selectedMonth = "1";
  allDaysList:{day:string, occurrences:number}[] = [];
  allRoomMonthsList:{month:string, roomType:string; occurrences:number}[] = [];
  flag:boolean;
  

  ngOnInit(): void {
    this.updateChart("Day");
  }

  filterByMonth(selectedMonth:string){
    this.allDaysList = [];
    let formattedSelectedMonth = selectedMonth.padStart(2, '0');
    console.log(formattedSelectedMonth);
    this.roomUsageService.getGraphByMonth(formattedSelectedMonth).subscribe(res=>{
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
                occurrences: parseInt(this.result[j].occurrences)
              });
              break;
            }
          }
          if(!this.flag){   //if the particular day of the month does not have any room booking
            this.allDaysList.push({
              day: i.toString(),
              occurrences:0
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
          text: 'Line Graph of No of Bookings Against Days',
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
    public barChartType: ChartType= 'line';
    public barChartLegend = true;


    updateChart(filter:string){
      if(filter == "Day"){
        var dataset = this.allDaysList.map(item => item.occurrences);
        var labels = this.allDaysList.map(item => item.day);
        var xText = "Days";
        var title = "Line Graph of No of Bookings Against Days";
      }
      else{
        var dataset = this.allMonthsList.map(item => item.occurrences);
        var labels = this.allMonthsList.map(item => item.month);
        var xText = "Months";
        var title = "Line Graph of No of Bookings Against Months of Year 2023";
      }

      this.barChartData = [
        {
          data: dataset, 
          label: 'No of Bookings',
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

    allMonthsList:{month:string, occurrences:number}[] = [];

    monthNameList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    filterByYear(){
      this.allMonthsList = [];
      this.roomUsageService.getGraphByYear().subscribe(res=>{
        this.result = res;
        console.log(this.result);

        for(let i = 0; i < this.monthNameList.length; i++){
          this.flag = false;
          for(let j = 0; j < this.result.length; j++){
            if(i+1 == parseInt(this.result[j].monthNo)){
              this.flag = true;
              this.allMonthsList.push({
                month: this.monthNameList[i],
                occurrences: parseInt(this.result[j].occurrences)
              });
              break;
            }
          }
          if(!this.flag){   //if the particular month does not have any room booking
            this.allMonthsList.push({
              month: this.monthNameList[i],
              occurrences: 0
            })
          }
        }
        console.log(this.allMonthsList);
        this.updateChart("Year");
      })  
    }
}
