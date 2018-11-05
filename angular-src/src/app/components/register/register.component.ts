import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService, 
    public messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) { }

  hide = true;

  onRegisterSubmit(){

    
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Require fields
    if(!this.validateService.validateRegister(user)){
      this.messageService.showError('Please fill in all fields');
      return false;
    }

    // Validate email
    if(!this.validateService.validateEmail(user.email)){
      this.messageService.showError('Please use a valid email');
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.messageService.showMessage('You are now registered and can log in');
        this.router.navigate(['login']);
      } else {
        this.messageService.showError('Something went wrong');
        this.router.navigate(['register']);
      }
    })

  }
}
