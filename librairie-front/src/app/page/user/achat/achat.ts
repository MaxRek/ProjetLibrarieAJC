import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AchatDto } from '../../../dto/achat-dto';
import { AchatService } from '../../../service/achat-service';
import { AuthService } from '../../../service/auth-service';

@Component({
  selector: 'achat-user',
  imports: [ CommonModule,  ReactiveFormsModule],
  templateUrl: './achat.html',
  styleUrl: '../user.css',
})
export class AchatUser implements OnInit {
  protected achat$!: Observable<AchatDto[]>;

  private clientId!: number;

  constructor(private achatService: AchatService,
      private authService: AuthService) { }

  ngOnInit(): void {
    // Récupère l'id client comme STRING depuis l'auth
    const idClientStr = this.authService.idClient;
    // je mets en number c'est mieux
    this.clientId = Number(idClientStr);
    
    this.achat$ = this.achatService.findByClient(this.clientId);
  }

  public trackAchat(index: number, value: AchatDto) {
    return value.id;
  }

}
