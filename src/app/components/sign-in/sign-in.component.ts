import { Component, Inject } from '@angular/core';

export interface SignInData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor() { }


}

