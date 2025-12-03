import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AdministrateurDto } from '../../../dto/administrateur-dto';
import { AdministrateurService } from '../../../service/administrateur-service';

import { CompteDto } from '../../../dto/compte-dto';
import { CompteService } from '../../../service/compte-service';


@Component({
  selector: 'administrateur',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './administrateur.html',
  styleUrl: '../admin.css',
})
export class Administrateur implements OnInit {
  protected administrateur$!: Observable<AdministrateurDto[]>;

  protected showForm: boolean = false;
  protected administrateurForm!: FormGroup;

  protected editingAdministrateur!: AdministrateurDto | null;

  constructor(
    private administrateurService: AdministrateurService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.administrateur$ = this.administrateurService.findAll();

    this.administrateurForm = this.formBuilder.group({
    
    });
  }

  public trackAdministrateur(index: number, administrateur: AdministrateurDto) {
    return administrateur.id;
  }

  public creerOuModifier() {
    if (this.editingAdministrateur) {
      this.administrateurService.save(new AdministrateurDto(
        this.editingAdministrateur.id,
        this.editingAdministrateur.nom,
        this.editingAdministrateur.prenom,
        this.editingAdministrateur.email,
        this.editingAdministrateur.password
      ));
    } else {
      const newCompte = this.administrateurForm.value;
      this.administrateurService.save(new AdministrateurDto(
        0,
        newCompte.nom,
        newCompte.prenom,
        newCompte.email,
        newCompte.password
      ));
    }
    this.showForm = false;
    this.editingAdministrateur = null;
    this.administrateurForm.reset();
  }

  public editer (administrateur: AdministrateurDto) {
    this.editingAdministrateur = administrateur;
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
