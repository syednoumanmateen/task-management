import { SettingsComponent } from "./user/settings/settings.component";
// import { AuthGuardService } from "./providers/auth-guard.service";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";

// *******************************************************************************
// Layouts

import { Layout1Component } from "./layout/layout-1/layout-1.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./user/login/login.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { ForgetPasswordComponent } from "./user/forget-password/forget-password.component";
import { ProjectComponent } from "./project/project/project.component";
import { ProjectDetailsComponent } from "./project/project-details/project-details.component";
import { TasksComponent } from "./project/tasks/tasks.component";
import { TasksViewComponent } from "./project/tasks-view/tasks-view.component";
import { LayoutBlankComponent } from "./layout/layout-blank/layout-blank.component";
import { AddComponent } from "./user/add/add.component";
import { ViewComponent } from "./user/view/view.component";
import { ListComponent } from "./user/list/list.component";
import { AddProjectComponent } from "./project/add-project/add-project.component";

// *******************************************************************************
// Pages

// *******************************************************************************
// Routes

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  {
    path: "dashboard",
    component: Layout1Component,
    // canActivate: [AuthGuardService],
    children: [{ path: "", component: DashboardComponent }],
  },
  {
    path: "login",
    component: LayoutBlankComponent,
    children: [{ path: "", component: LoginComponent }],
  },
  {
    path: "profile",
    component: Layout1Component,
    children: [{ path: "", component: ProfileComponent }],
  },
  {
    path: "settings",
    component: Layout1Component,
    children: [{ path: "", component: SettingsComponent }],
  },
  {
    path: "forget-password",
    component: LayoutBlankComponent,
    children: [{ path: "", component: ForgetPasswordComponent }],
  },
  {
    path: "project",
    component: Layout1Component,
    children: [{ path: "", component: ProjectComponent }],
  },
  {
    path: "project-details",
    component: Layout1Component,
    children: [{ path: "", component: ProjectDetailsComponent }],
  },
  {
    path: "add-project",
    component: Layout1Component,
    children: [{ path: "", component: AddProjectComponent }],
  },
  {
    path: "tasks",
    component: Layout1Component,
    children: [{ path: "", component: TasksComponent }],
  },
  {
    path: "tasks-view",
    component: Layout1Component,
    children: [{ path: "", component: TasksViewComponent }],
  },
  {
    path: "add-user",
    component: Layout1Component,
    children: [{ path: "", component: AddComponent }],
  },
  {
    path: "view-user",
    component: Layout1Component,
    children: [{ path: "", component: ViewComponent }],
  },
  {
    path: "list-user",
    component: Layout1Component,
    children: [{ path: "", component: ListComponent }],
  },

  // 404 Not Found page
  { path: "**", component: NotFoundComponent },
];

// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
