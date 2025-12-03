import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompteDto } from '../../../dto/compte-dto';
import { CompteService } from '../../../service/compte-service';

@Component({
  selector: 'compte',
  imports: [ CommonModule,  ReactiveFormsModule],
  templateUrl: './compte.html',
  styleUrl: '../admin.css',
})
export class Compte implements OnInit {
  protected compte$!: Observable<CompteDto[]>;

  protected showForm: boolean = false;
  protected compteForm!: FormGroup;
  protected nomCtrl!: FormControl;
  protected prenomCtrl!: FormControl;
  protected emailCtrl!: FormControl;
  protected passwordCtrl!: FormControl;

  protected editingCompte!: CompteDto | null;

  constructor(
    private compteService: CompteService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.compte$ = this.compteService.findAll();

    this.nomCtrl = new FormControl('');
    this.prenomCtrl = new FormControl('');
    this.emailCtrl = new FormControl('');
    this.passwordCtrl = new FormControl('');

    this.compteForm = this.formBuilder.group({
      nom: this.nomCtrl,
      prenom: this.prenomCtrl,
      email: this.emailCtrl,
      password: this.passwordCtrl,
    });
  }

  public trackCompte(index: number, compte: CompteDto) {
    return compte.id;
  }

  public creerOuModifier() {
    if (this.editingCompte) {
      this.compteService.save(new CompteDto(
        this.editingCompte.id,
        this.nomCtrl.value,
        this.prenomCtrl.value,
        this.emailCtrl.value,
        this.passwordCtrl.value
      ));
    } else {
      this.compteService.save(new CompteDto(
        0,
        this.nomCtrl.value,
        this.prenomCtrl.value,
        this.emailCtrl.value,
        this.passwordCtrl.value
      ));
    }
    this.showForm = false;
    this.editingCompte = null;
    this.compteForm.reset();
  }

  public editer(compte: CompteDto) {
    this.editingCompte = compte;
    this.nomCtrl.setValue(compte.nom);
    this.prenomCtrl.setValue(compte.prenom);
    this.emailCtrl.setValue(compte.email);
    this.passwordCtrl.setValue('');
    this.showForm = true;
  }

  public supprimer(compte: CompteDto) {
    this.compteService.deleteById(compte.id);
  }

}
