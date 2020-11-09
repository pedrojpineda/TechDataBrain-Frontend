import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './Components/menu/menu.component';
import { AddJobTitleComponent } from './Components/Organization/add-job-title/add-job-title.component';
import { AddJobTypeComponent } from './Components/Organization/add-job-type/add-job-type.component';
import { AddUserComponent } from './Components/Users/add-user/add-user.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './Guards/auth.guard';
import { AddTaskComponent } from './Components/ToDo/add-task/add-task.component';
import { UpdateDepartmentComponent } from './Components/Organization/update-department/update-department.component';
import { UpdateJobTitleComponent } from './Components/Organization/update-job-title/update-job-title.component';
import { UpdateJobTypeComponent } from './Components/Organization/update-job-type/update-job-type.component';
import { UpdateUserComponent } from './Components/Users/update-user/update-user.component';
import { AdminDepartmentsComponent } from './Components/Organization/admin-departments/admin-departments.component';
import { UpdateTaskComponent } from './Components/ToDo/update-task/update-task.component';


const routesApp: Routes = [
  { path: '', canActivate: [AuthGuard], component: AddTaskComponent },
  { path: 'organizacion/dependencias', canActivate: [AuthGuard], component: AdminDepartmentsComponent },
  { path: 'organizacion/administrar-dependencias', canActivate: [AuthGuard], data: {only: 'Admin'}, component: AdminDepartmentsComponent },
  { path: 'organizacion/actualizar-dependencia/:id', canActivate: [AuthGuard], data: {only: 'Admin'}, component: UpdateDepartmentComponent },
  { path: 'organizacion/cargos', canActivate: [AuthGuard], component: AddJobTitleComponent },
  { path: 'organizacion/administrar-cargos', canActivate: [AuthGuard], data: {only: 'Admin'}, component: AddJobTitleComponent },
  { path: 'organizacion/actualizar-cargo/:id', canActivate: [AuthGuard], data: {only: 'Admin'}, component: UpdateJobTitleComponent },
  { path: 'organizacion/tipos-vinculacion', canActivate: [AuthGuard], component: AddJobTypeComponent },
  { path: 'organizacion/administrar-tipos-vinculacion', canActivate: [AuthGuard], data: {only: 'Admin'}, component: AddJobTypeComponent },
  { path: 'organizacion/actualizar-tipo-vinculacion/:id', canActivate: [AuthGuard], data: {only: 'Admin'}, component: UpdateJobTypeComponent },
  { path: 'usuarios/directorio', canActivate: [AuthGuard], component: AddUserComponent },
  { path: 'usuarios/administrar-usuarios',  canActivate: [AuthGuard], data: {only: 'Admin'}, component: AddUserComponent },
  { path: 'usuarios/actualizar-usuario/:id',  canActivate: [AuthGuard], data: {only: 'Admin'}, component: UpdateUserComponent },
  { path: 'usuarios/actualizar-mi-usuario/:id',  canActivate: [AuthGuard], component: UpdateUserComponent },
  { path: 'tareas', canActivate: [AuthGuard], component: AddTaskComponent },
  { path: 'administrar-tareas', canActivate: [AuthGuard], data: {only: 'Directivo'}, component: AddTaskComponent },
  { path: 'actualizar-tarea/:id', canActivate: [AuthGuard], data: {only: 'Directivo'}, component: UpdateTaskComponent },
  { path: 'ver-tarea/:id', canActivate: [AuthGuard], component: UpdateTaskComponent },
  { path: 'login', component: LoginComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AddJobTitleComponent,
    AddJobTypeComponent,
    AddUserComponent,
    LoginComponent,
    AddTaskComponent,
    UpdateDepartmentComponent,
    UpdateJobTitleComponent,
    UpdateJobTypeComponent,
    UpdateUserComponent,
    AdminDepartmentsComponent,
    UpdateTaskComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routesApp),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
