import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/providers/user.service";
import { DataStorageService } from "src/app/providers/data-storage.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  curTab = "password";
  formGroup: FormGroup;
  constructor(
    private userService: UserService,
    private storage: DataStorageService
  ) {
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
    let p = {
      Password: this.formGroup.value.currentpsw,
      newPassword: this.formGroup.value.newpsw,
    };
    this.userService.changePassword(p).subscribe(
      (res: any) => {},
      (err: any) => {}
    );
  }
}
