import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "./../../providers/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"],
})
export class AddComponent implements OnInit {
  formGroup: FormGroup;
  urlParams: any;
  userData: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formGroup = this.getFormGroup();
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data;
    });
  }

  ngOnInit(): void {
    if (this.urlParams.id) {
      this.userView();
    }
  }

  getFormGroup() {
    let fg = new FormGroup({
      fname: new FormControl(""),
      lname: new FormControl(""),
      dno: new FormControl(""),
      street: new FormControl(""),
      area: new FormControl(""),
      landmark: new FormControl(""),
      city: new FormControl(""),
      state: new FormControl(""),
      pincode: new FormControl(""),
      mobileno: new FormControl(""),
      role: new FormControl(""),
      email: new FormControl(""),
      dob: new FormControl(""),
    });
    return fg;
  }
  onSave() {
    let fg = this.formGroup.value;
    let p = {
      fName: fg.fname,
      lName: fg.lname,
      address: {
        doorNumber: fg.dno,
        street: fg.street,
        area: fg.area,
        landmark: fg.landmark,
        city: fg.city,
        state: fg.state,
        postalCode: fg.pincode,
      },
      phone: fg.mobileno,
      email: fg.email,
      role: fg.role,
    };
    this.userService.addUser(p).subscribe(
      (res: any) => {},
      (err: any) => {}
    );
  }

  onCancel() {
    this.formGroup.reset();
    this.router.navigate(["/dashboard"]);
  }

  userView() {
    this.userService.viewUser(this.urlParams.id).subscribe(
      (res: any) => {
        this.userData = res.userData;

        this.setValue();
      },
      (err: any) => {}
    );
  }

  setValue() {
    let fg = this.formGroup;
    let u = this.userData;
    fg.controls.fname.setValue(u.fName);
    fg.controls.lname.setValue(u.lName);
    fg.controls.dno.setValue(u.address.doorNumber);
    fg.controls.street.setValue(u.address.street);
    fg.controls.area.setValue(u.address.area);
    fg.controls.landmark.setValue(u.address.landmark);
    fg.controls.city.setValue(u.address.city);
    fg.controls.state.setValue(u.address.state);
    fg.controls.pincode.setValue(u.address.postalCode);
    fg.controls.mobileno.setValue(u.phone);
    fg.controls.email.setValue(u.email);
    fg.controls.role.setValue(u.role);
  }
}
