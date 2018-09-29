import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  username: String;
  password: String;
  hide = true;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
    ) { }


  onRegister()
  {
    this.router.navigate(['register']);
  }

  onLoginSubmit()
  {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      
      if(data.success){
        this.authService.storeUserData(data.token, data.users);
        this.messageService.showMessage('You are now logged in');
        this.router.navigate(['dashboard']);
      } else {
        this.messageService.showError(data.msg);
        this.router.navigate(['login']);
      }
    });
  }
}

