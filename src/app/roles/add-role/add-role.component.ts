import { FormGroup } from "@angular/forms";
import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-role",
  templateUrl: "./add-role.component.html",
  styleUrls: ["./add-role.component.css"],
})
export class AddRoleComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private appService: AppService) {
    this.appService.pageTitle = "addrole - Task Management";
    this.formGroup = this.getFormGroup();
  }

  ngOnInit(): void {}

  getFormGroup() {
    let fg = new FormGroup({});
    return fg;
  }

  validateForm() {
    let fg = this.formGroup.value;
    let msg = "";
    if (fg) {
      msg = "";
    }
    return {
      msg: msg,
      status: (msg = "") ? true : false,
    };
  }

  onApiCall() {}

  onCancel() {}
}
