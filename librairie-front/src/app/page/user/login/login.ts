import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthRequestDto } from '../../../dto/auth-request-dto';
import { AuthService } from '../../../service/auth-service';

@Component({
  selector: 'app-login-page',
  imports: [ FormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginPage {
  protected authForm: AuthRequestDto = new AuthRequestDto("","");

  constructor(private authService: AuthService){}

  public connecter() {
    this.authService.auth(this.authForm);
  }
}
