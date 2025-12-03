import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SuiviDto } from '../../../dto/suivi-dto';
import { SuiviService } from '../../../service/suivi-service';

@Component({
  selector: 'suivi-user',
  imports: [ CommonModule,  ReactiveFormsModule],
  templateUrl: './suivi.html',
  styleUrl: '../admin.css',
})
export class SuiviUser implements OnInit {
  protected suivi$!: Observable<SuiviDto[]>;

  // Je mets un id pour l'instant mais après on devra réccupérer un vrai id grace au login
  private clientId = 1;

  constructor(private suiviService: SuiviService) { }

  ngOnInit(): void {
    this.suivi$ = this.suiviService.findByClient(this.clientId);
  }

  public trackSuivi(index: number, value: SuiviDto) {
    return value.id;
  }

}
