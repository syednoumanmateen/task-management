import { AddTaskComponent } from "./project/add-task/add-task.component";
import { ViewRoleComponent } from "./roles/view-role/view-role.component";

import { SettingsComponent } from "./user/settings/settings.component";
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
import { LayoutBlankComponent } from "./layout/layout-blank/layout-blank.component";
import { AddComponent } from "./user/add/add.component";
import { ViewComponent } from "./user/view/view.component";
import { ListComponent } from "./user/list/list.component";
import { AddProjectComponent } from "./project/add-project/add-project.component";
import { AddFeatureComponent } from "./features/add-feature/add-feature.component";
import { ViewFeatureComponent } from "./features/view-feature/view-feature.component";
import { FeaturesListComponent } from "./features/features-list/features-list.component";
import { AddRoleComponent } from "./roles/add-role/add-role.component";
import { RolesListComponent } from "./roles/roles-list/roles-list.component";
import { LayoutWithoutSidenavComponent } from "./layout/layout-without-sidenav/layout-without-sidenav.component";

// *******************************************************************************
// Pages

// *******************************************************************************
// Routes

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  {
    path: "dashboard",
    component: LayoutWithoutSidenavComponent,
    children: [{ path: "", component: DashboardComponent }],
  },
  {
    path: "login",
    component: LayoutBlankComponent,
    children: [{ path: "", component: LoginComponent }],
  },
  {
    path: "profile",
    component: LayoutWithoutSidenavComponent,
    children: [{ path: "", component: ProfileComponent }],
  },
  {
    path: "change-password",
    component: LayoutWithoutSidenavComponent,
    children: [{ path: "", component: SettingsComponent }],
  },
  {
    path: "forgot-password",
    component: LayoutBlankComponent,
    children: [{ path: "", component: ForgetPasswordComponent }],
  },
  {
    path: "projects",
    component: LayoutWithoutSidenavComponent,
    children: [
      {
        path: "",
        component: ProjectComponent,
      },
      {
        path: "add-project",
        component: AddProjectComponent,
      },
      {
        path: "view-project",
        component: ProjectDetailsComponent,
      },
    ],
  },
  {
    path: "tasks",
    component: LayoutWithoutSidenavComponent,
    children: [
      {
        path: "add-task",
        component: AddTaskComponent,
      }
    ],
  },
  {
    path: "users",
    component: LayoutWithoutSidenavComponent,
    children: [
      {
        path: "",
        component: ListComponent,
      },
      {
        path: "add-user",
        component: AddComponent,
      },
      {
        path: "view-user",
        component: ViewComponent,
      },
    ],
  },
  {
    path: "features",
    component: LayoutWithoutSidenavComponent,
    children: [
      {
        path: "",
        component: FeaturesListComponent,
      },
      {
        path: "add-feature",
        component: AddFeatureComponent,
      },
      {
        path: "view-feature",
        component: ViewFeatureComponent,
      },
    ],
  },
  {
    path: "roles",
    component: LayoutWithoutSidenavComponent,
    children: [
      {
        path: "",
        component: RolesListComponent,
      },
      {
        path: "add-role",
        component: AddRoleComponent,
      },
      {
        path: "view-role",
        component: ViewRoleComponent,
      },
    ],
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
