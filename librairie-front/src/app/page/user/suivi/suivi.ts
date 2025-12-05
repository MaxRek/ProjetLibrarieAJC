import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SuiviDto } from '../../../dto/suivi-dto';
import { SuiviService } from '../../../service/suivi-service';
import { AuthService } from '../../../service/auth-service';

@Component({
  selector: 'suivi-user',
  imports: [ CommonModule,  ReactiveFormsModule],
  templateUrl: './suivi.html',
  styleUrl: '../user.css',
})
export class SuiviUser implements OnInit {
  protected suivi$!: Observable<SuiviDto[]>;

  private clientId!: number;

  constructor(private suiviService: SuiviService,
      private authService: AuthService) { }

  ngOnInit(): void {
    // Récupère l'id client comme STRING depuis l'auth
    const idClientStr = this.authService.idClient;
    // je mets en number c'est mieux
    this.clientId = Number(idClientStr);

    this.suivi$ = this.suiviService.findByClient(this.clientId);
  }

  public trackSuivi(index: number, value: SuiviDto) {
    return value.id;
  }

}
