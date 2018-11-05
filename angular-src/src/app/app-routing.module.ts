import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';

import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { AuthGuard } from './guards/auth.guard';
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { ApplyComponent } from './components/apply/apply.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateJobComponent } from './components/create-job/create-job.component';

const routes: Routes = [
  { path: '', redirectTo: 'job-search', pathMatch: 'full' },
  { path: 'job-search', component: JobListComponent, data: { state: 'job-search' }} ,
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: SignInComponent},
  { path: 'edit/:id', component: EditJobComponent, canActivate:[AuthGuard]},
  { path: 'apply/:id', component: ApplyComponent, canActivate:[AuthGuard]},
  { path: 'my-jobs', component: MyJobsComponent, canActivate:[AuthGuard], data: { state: 'my-jobs' }},
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard], data: { state: 'profile' }},
  { path: 'create-job', component: CreateJobComponent, canActivate:[AuthGuard], data: { state: 'create-job' }},
  

  // TODO - other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
