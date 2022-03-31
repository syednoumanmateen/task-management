import { CustomDaterangePickerComponent } from "./custom-daterange-picker/custom-daterange-picker.component";
import { AuthInterceptorService } from "./providers/auth-interceptor.service";
import { UserService } from "./providers/user.service";
import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";

// *******************************************************************************
// NgBootstrap

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";

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
import { AddFeatureComponent } from "./features/add-feature/add-feature.component";
import { ViewFeatureComponent } from "./features/view-feature/view-feature.component";
import { FeaturesListComponent } from "./features/features-list/features-list.component";
import { AddRoleComponent } from "./roles/add-role/add-role.component";
import { ViewRoleComponent } from "./roles/view-role/view-role.component";
import { RolesListComponent } from "./roles/roles-list/roles-list.component";
import { AddTaskComponent } from "./project/add-task/add-task.component";
import { CommonModule } from "@angular/common";
import { MyFilterPipe } from './directive/my-filter.pipe';
import { RoleFeaturesComponent } from './roles/role-features/role-features.component';

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
    AddFeatureComponent,
    ViewFeatureComponent,
    FeaturesListComponent,
    AddRoleComponent,
    ViewRoleComponent,
    RolesListComponent,
    AddTaskComponent,
    CustomDaterangePickerComponent,
    MyFilterPipe,
    RoleFeaturesComponent,
  ],

  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    CommonModule,
    // App
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      onActivateTick: false,
      timeOut: 1000,
    }),
  ],

  providers: [
    Title,
    AppService,
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
