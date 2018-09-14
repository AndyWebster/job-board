import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

// Component imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component'

import { CreateJobComponent } from './components/create-job/create-job.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { ProfileComponent } from './components/profile/profile.component';

// Services
import { JobsService } from './services/jobs.service';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

import { AuthGuard } from './guards/auth.guard';
// Material imports

import { MatSnackBarModule, MatDialogModule, MatTabsModule, MatDividerModule, MatDatepickerModule, MatInputModule, MatSelectModule, MatExpansionModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatFormFieldModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';


import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';




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
    
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
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
    
    
    
  ],
  providers: [JobsService, ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
