import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  navLinks = [
    {path:'job-search',label:'Search'},
    {path:'my-jobs',label:'My Jobs'},
    {path:'create-job',label:'Create'},
    {path:'profile',label:'Profile'}
    
  ];

  activeLink = this.navLinks[0];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private router: Router,
    private messageService: MessageService
    ) {}

  onLogoutClick(){
    this.authService.logout();
    this.messageService.showMessage('You are logged out');
    this.router.navigate(['/job-search']);
    return false;
  }

}

