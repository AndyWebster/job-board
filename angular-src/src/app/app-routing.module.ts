import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';

import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { AuthGuard } from './guards/auth.guard';
import { EditJobComponent } from './components/edit-job/edit-job.component';

const routes: Routes = [
  { path: '', redirectTo: 'job-search', pathMatch: 'full' },
  { path: 'job-search', component: JobListComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: SignInComponent},
  { path: 'edit/:id', component: EditJobComponent},
  { path: 'dashboard', component: MyJobsComponent, canActivate:[AuthGuard]},

  // TODO - other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
