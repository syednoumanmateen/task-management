import { AppService } from 'src/app/providers/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.css']
})
export class ViewRoleComponent implements OnInit {

  constructor(private appService:AppService) {
    this.appService.pageTitle = "viewrole - Task Management";
   }

  ngOnInit(): void {
  }

}
