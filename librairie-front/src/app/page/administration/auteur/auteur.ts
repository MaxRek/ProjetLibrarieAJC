import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuteurDto } from '../../../dto/auteur-dto';

import { AuteurService } from '../../../service/auteur-service';

import { RouterModule } from '@angular/router';
@Component({
  selector: 'auteur', 
  imports: [ CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './auteur.html',
  styleUrl: '../admin.css',
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

    this.prenomCtrl = this.formBuilder.control('', Validators.required);
    this.nomCtrl = this.formBuilder.control('', Validators.required);

    this.auteurForm = this.formBuilder.group({
      prenom: this.prenomCtrl,
      nom: this.nomCtrl
    });
  }

  public trackAuteur(index: number, value: AuteurDto) {
    return value.id;
  }

  public creerOuModifier() {
    if (this.editingAuteur) {
      this.auteurService.save(new AuteurDto(this.editingAuteur.id, this.prenomCtrl.value, this.nomCtrl.value));
    } else {
      this.auteurService.save(new AuteurDto(0, this.prenomCtrl.value, this.nomCtrl.value));
    }

    this.showForm = false;
    this.editingAuteur = null;
    this.auteurForm.reset();
  }

  public editer (auteur: AuteurDto) {
    this.editingAuteur = auteur;
    this.prenomCtrl.setValue(auteur.prenom);
    this.nomCtrl.setValue(auteur.nom);
    this.showForm = true;
  }

  public annulerEditer() {
    this.editingAuteur = null;
    this.auteurForm.reset();
    this.showForm = false;
  }

  public supprimer (auteur: AuteurDto) {
    this.auteurService.deleteById(auteur.id);
  }

}
