import { Router } from "@angular/router";
import { UserService } from "src/app/providers/user.service";
import { DataStorageService } from "./data-storage.service";
import { HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService {
  checked = false;
  constructor(private storage: DataStorageService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let jwt = this.storage.getToken();
    let reqOpt: any = {};
    if (jwt) {
      reqOpt["headers"] = req.headers.set("Authorization", "JWT " + jwt);
    }
    let reqClone = req.clone(reqOpt);
    return next.handle(reqClone).pipe(
      tap(
        (res: any) => {},
        (err: any) => {
          if (err.status == "401" && this.checked == false) {
            this.checked = true;
          }
        }
      )
    );
  }
}
