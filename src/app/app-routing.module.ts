import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./view/login/login.component";
import {MainwindowComponent} from "./view/mainwindow/mainwindow.component";
import {EmployeeComponent} from "./view/modules/employee/employee.component";
import {HomeComponent} from "./view/home/home.component";
import {DashboardComponent} from "./view/dashboard/dashboard.component";
import {ArrearsbyprogramComponent} from "./report/view/arrearsbyprogram/arrearsbyprogram.component";
import {CourseComponent} from "./view/modules/course/course.component";
import {ClassComponent} from "./view/modules/class/class.component";
import {BatchComponent} from "./view/modules/batch/batch.component";
import {StudentComponent} from "./view/modules/student/student.component";



const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "", redirectTo: 'login', pathMatch: 'full'},
  {path: "main",component: MainwindowComponent,
    children: [
      {path: "home", component: HomeComponent},
      {path: "employee", component: EmployeeComponent},
      {path: "reportarrears", component: ArrearsbyprogramComponent},
      {path: "dashboard", component: DashboardComponent},
      {path: "course", component: CourseComponent},
      {path: "class", component: ClassComponent},
      {path: "batch", component: BatchComponent},
      {path: "student", component: StudentComponent}

    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
