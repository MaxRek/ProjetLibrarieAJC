import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AdministrateurDto } from '../../../dto/administrateur-dto';
import { AdministrateurService } from '../../../service/administrateur-service';

import { CompteDto } from '../../../dto/compte-dto';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'administrateur',
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './administrateur.html',
  styleUrl: '../admin.css',
})
export class Administrateur implements OnInit {
  protected administrateur$!: Observable<AdministrateurDto[]>;

  protected showForm: boolean = false;
  protected administrateurForm!: FormGroup;
  protected nomCtrl!: FormControl;
  protected prenomCtrl!: FormControl;
  protected emailCtrl!: FormControl;
  protected passwordCtrl!: FormControl;

  protected editingAdministrateur!: AdministrateurDto | null;

  constructor(
    private administrateurService: AdministrateurService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.administrateur$ = this.administrateurService.findAll();
    this.nomCtrl = this.formBuilder.control('', Validators.required);
    this.prenomCtrl = this.formBuilder.control('', Validators.required);
    this.emailCtrl = this.formBuilder.control('', Validators.required);
    this.passwordCtrl = this.formBuilder.control('', Validators.required);

    this.administrateurForm = this.formBuilder.group({
      nom: this.nomCtrl,
      prenom: this.prenomCtrl,
      email: this.emailCtrl,
      password: this.passwordCtrl,
    
    });
  }

  public trackAdministrateur(index: number, administrateur: AdministrateurDto) {
    return administrateur.id;
  }

  public creerOuModifier() {
    if (this.editingAdministrateur) {
      this.administrateurService.save(
        new AdministrateurDto(
          this.editingAdministrateur.id,
          this.nomCtrl.value,
          this.prenomCtrl.value,
          this.emailCtrl.value,
          this.passwordCtrl.value
      ));
    } else {
      this.administrateurService.save(
        new AdministrateurDto(
          0,
          this.nomCtrl.value,
          this.prenomCtrl.value,
          this.emailCtrl.value,
          this.passwordCtrl.value
      ));
    }
    this.showForm = false;
    this.editingAdministrateur = null;
    this.administrateurForm.reset();
  }

  public editer (administrateur: AdministrateurDto) {
    this.editingAdministrateur = administrateur;
    this.nomCtrl.setValue(administrateur.nom);
    this.prenomCtrl.setValue(administrateur.prenom);
    this.emailCtrl.setValue(administrateur.email);
    this.passwordCtrl.setValue(administrateur.password);
    this.showForm = true;
  }

  public annulerEditer() {
    this.editingAdministrateur = null;
    this.showForm = false;
    this.administrateurForm.reset();
  }

  public supprimer(administrateur: AdministrateurDto) {
    this.administrateurService.deleteById(administrateur.id);
  }

}
