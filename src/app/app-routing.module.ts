import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { CreateJobComponent } from './components/create-job/create-job.component';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'job-list', pathMatch: 'full' },
  { path: 'job-list', component: JobListComponent},
  { path: 'create-job', component: CreateJobComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: SignInComponent},
  { path: 'my-jobs', component: MyJobsComponent},
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  // TODO - other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
