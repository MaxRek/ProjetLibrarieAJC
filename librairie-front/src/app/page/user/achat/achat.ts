import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AchatDto } from '../../../dto/achat-dto';
import { AchatService } from '../../../service/achat-service';

@Component({
  selector: 'achat-user',
  imports: [ CommonModule,  ReactiveFormsModule],
  templateUrl: './achat.html',
  styleUrl: '../user.css',
})
export class AchatUser implements OnInit {
  protected achat$!: Observable<AchatDto[]>;

// Je mets un id pour l'instant mais après on devra réccupérer un vrai id grace au login
  private clientId = 1;

  constructor(private achatService: AchatService) { }

  ngOnInit(): void {
    this.achat$ = this.achatService.findByClient(this.clientId);
  }

  public trackAchat(index: number, value: AchatDto) {
    return value.id;
  }

}
