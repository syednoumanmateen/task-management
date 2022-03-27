import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/providers/user.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  curTab = "password";
  formGroup: FormGroup;
  constructor(private userService: UserService) {
    this.formGroup = this.getFormGroup();
  }

  ngOnInit(): void {}

  getFormGroup() {
    let fg = new FormGroup({
      currentpsw: new FormControl(""),
      newpsw: new FormControl(""),
      repeatnewpsw: new FormControl(""),
    });
    return fg;
  }

  onSave() {
    this.userService.changePassword(email).subscribe(
      () => {},
      () => {}
    );
  }
}
