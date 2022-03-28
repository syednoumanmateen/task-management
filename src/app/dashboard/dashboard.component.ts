import { AppService } from 'src/app/providers/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private appService:AppService
  ) { 
    this.appService.pageTitle = "dashboard - Task Management";
  }

  ngOnInit(): void {
  }

}
