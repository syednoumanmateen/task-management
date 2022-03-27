import { Router } from "@angular/router";
import { UserService } from "src/app/providers/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  userData: any;
  constructor(private userService: UserService, private router: Router) {
    this.userData = {};
  }

  ngOnInit(): void {
    this.userList();
  }

  userList() {
    this.userService.listUser().subscribe(
      (res: any) => {
        this.userData = res;
      },
      (err: any) => {}
    );
  }

  onView(id: any) {
    this.router.navigate(["./view-user"], {
      queryParams: {
        id: id,
      },
    });
  }

  onDelete(id: any) {
    this.userService.deleteUser(id).subscribe(
      (res: any) => {},
      (err: any) => {}
    );
  }
}
