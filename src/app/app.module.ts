import { AuthInterceptorService } from "./providers/auth-interceptor.service";
import { UserService } from "./providers/user.service";
import { AuthGuardService } from "./providers/auth-guard.service";
import { AuthService } from "./providers/auth.service";
import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";

// *******************************************************************************
// NgBootstrap

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// *******************************************************************************
// App

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppService } from "./providers/app.service";
import { LayoutModule } from "./layout/layout.module";

// *******************************************************************************
// Pages

import { NotFoundComponent } from "./not-found/not-found.component";
import { LoginComponent } from "./user/login/login.component";
import { ForgetPasswordComponent } from "./user/forget-password/forget-password.component";
import { ProjectComponent } from "./project/project/project.component";
import { ProjectDetailsComponent } from "./project/project-details/project-details.component";
import { TasksComponent } from "./project/tasks/tasks.component";
import { TasksViewComponent } from "./project/tasks-view/tasks-view.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SettingsComponent } from "./user/settings/settings.component";
import { AddComponent } from "./user/add/add.component";
import { ViewComponent } from "./user/view/view.component";
import { ListComponent } from "./user/list/list.component";
import { AddProjectComponent } from "./project/add-project/add-project.component";

// *******************************************************************************
//

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,

    // Pages
    LoginComponent,
    ForgetPasswordComponent,
    ProjectComponent,
    ProjectDetailsComponent,
    TasksComponent,
    TasksViewComponent,
    ProfileComponent,
    DashboardComponent,
    SettingsComponent,
    AddComponent,
    ViewComponent,
    ListComponent,
    AddProjectComponent,
  ],

  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,

    // App
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      onActivateTick: false,
      timeOut:30000
    }),
  ],

  providers: [
    Title,
    AppService,
    AuthService,
    AuthGuardService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
