import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadModule } from './upload/upload.module';
import { RouterModule, Routes } from '@angular/router';

// Component imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component'
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { CreateJobComponent } from './components/create-job/create-job.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { CoverDialogComponent } from './components/my-posts/my-posts.component';
import { ConfirmDialogComponent } from './components/my-posts/my-posts.component';

import { ApplyComponent } from './components/apply/apply.component';
import { ApplicationsComponent } from './components/applications/applications.component';
// Services
import { JobsService } from './services/jobs.service';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

import { DatePipe } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';

// Material imports

import { MatRippleModule, MatBadgeModule, MatTableModule, MatStepperModule, MatTooltipModule, MatSlideToggleModule, MatButtonToggleModule, MatSnackBarModule, MatDialogModule, MatTabsModule, MatDividerModule, MatDatepickerModule, MatInputModule, MatSelectModule, MatExpansionModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatFormFieldModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Misc


const modules = [
  MatToolbarModule,
  ScrollDispatchModule,
  MatRippleModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatDividerModule,
  MatMomentDateModule,
  ReactiveFormsModule,
  MatTabsModule,
  MatDialogModule,
  MatSnackBarModule,
  MatButtonToggleModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatStepperModule,
  MatBadgeModule,
  MatTableModule,
  MatToolbarModule,
];





export function tokenGetter() {
  return localStorage.getItem('access_token');
}


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    JobListComponent,
    FilterPanelComponent,
    CreateJobComponent,
    MyJobsComponent,
    RegisterComponent,
    SignInComponent,
    ProfileComponent,
    EditJobComponent,
    MyPostsComponent,
    CoverDialogComponent,
    ConfirmDialogComponent,
    ApplyComponent,
    ApplicationsComponent,
    
  ],
  entryComponents: [CoverDialogComponent, ConfirmDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule, 
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    
    LayoutModule,

    ...modules,
      JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080', 'localhost:4200', 'localhost:5000'],
        blacklistedRoutes: ['localhost:8080/auth/']
      }
    }),
    UploadModule
    
    
  ],
  exports: [...modules, 
    AppComponent,
    NavBarComponent,
    JobListComponent,
    FilterPanelComponent,
    CreateJobComponent,
    MyJobsComponent,
    RegisterComponent,
    SignInComponent,
    ProfileComponent,
    EditJobComponent,
    MyPostsComponent,
    CoverDialogComponent,
    ConfirmDialogComponent,
    ApplyComponent,
    ApplicationsComponent,
    ],
  providers: [ DatePipe, JobsService, ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
