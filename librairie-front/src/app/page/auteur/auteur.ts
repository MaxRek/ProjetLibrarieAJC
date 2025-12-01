import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuteurDto } from '../../dto/auteur-dto';

import { AuteurService } from '../../service/auteur-service';

@Component({
  selector: 'app-auteur',
  imports: [ CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './auteur.html',
  styleUrl: './auteur.css',
})

export class Auteur implements OnInit {
  protected auteur$!: Observable<AuteurDto[]>;

  protected showForm: boolean = false;
  protected auteurForm!: FormGroup;
  protected prenomCtrl!: FormControl;
  protected nomCtrl!: FormControl;

  protected editingAuteur!: AuteurDto | null;

  constructor(private auteurService: AuteurService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.auteur$ = this.auteurService.findAll();

    this.prenomCtrl = this.formBuilder.control('');
  }




}
