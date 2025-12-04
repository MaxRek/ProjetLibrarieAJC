import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LivreDto } from '../../../dto/livre-dto';
import { LivreService } from '../../../service/livre-service';
import { AuteurService } from '../../../service/auteur-service';
import { GenreEnum } from '../../../enumerator/genre-enum';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'livre',
  imports: [ CommonModule,  ReactiveFormsModule,RouterModule],
  templateUrl: './livre.html',
  styleUrl: '../admin.css',
})
export class Livre implements OnInit {
  protected livre$!: Observable<LivreDto[]>;
  auteur$!: Observable<any[]>;

  protected showForm: boolean = false
  protected livreForm!: FormGroup;

  protected libelleCtrl!: FormControl;
  protected prixCtrl!: FormControl
  protected stockCtrl!: FormControl;
  protected anneeCtrl!: FormControl;
  protected auteurIdCtrl!: FormControl;
  protected genreCtrl!: FormControl;

  protected genres = Object.values(GenreEnum);

  protected editingLivre!: LivreDto | null;

  constructor(private livreService: LivreService, private auteurService: AuteurService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.livre$ = this.livreService.findAll();
    this.auteur$ = this.auteurService.findAll();
    //this.genre$ = this.livreService.findAllGenres();
    this.libelleCtrl = this.formBuilder.control('', Validators.required);
    this.prixCtrl = this.formBuilder.control(0, Validators.required);
    this.stockCtrl = this.formBuilder.control(0, Validators.required);
    this.anneeCtrl = this.formBuilder.control(0, Validators.required);
    this.auteurIdCtrl = this.formBuilder.control(null, Validators.required);
    this.genreCtrl = this.formBuilder.control<GenreEnum | null>(null, Validators.required);

    this.livreForm = this.formBuilder.group({
      libelle: this.libelleCtrl,
      prix: this.prixCtrl,
      stock: this.stockCtrl,
      annee: this.anneeCtrl,
      auteurId: this.auteurIdCtrl,
      genre: this.genreCtrl,
    });

  }
  

  public trackLivre(index: number, value: LivreDto) {
    return value.id;
  }

  public creerOuModifier() {
    if (this.editingLivre) {
      this.livreService.save(
        new LivreDto(
          this.editingLivre.id, 
          this.stockCtrl.value, 
          this.libelleCtrl.value, 
          this.prixCtrl.value,
          this.anneeCtrl.value, 
          this.auteurIdCtrl.value, 
          this.genreCtrl.value
        ));
    } else {
      this.livreService.save(
        new LivreDto(
          0, 
          this.stockCtrl.value, 
          this.libelleCtrl.value, 
          this.prixCtrl.value,
          this.anneeCtrl.value, 
          this.auteurIdCtrl.value, 
          this.genreCtrl.value
        ));
    }

    this.showForm = false;
    this.editingLivre = null;
    this.livreForm.reset();
  }

  public editer (livre: any) {
    this.editingLivre = livre;
    this.libelleCtrl.setValue(livre.libelle);
    this.prixCtrl.setValue(livre.prix);
    this.stockCtrl.setValue(livre.stock);
    this.anneeCtrl.setValue(livre.annee);
    this.auteurIdCtrl.setValue(livre.auteur.id);
    this.genreCtrl.setValue(livre.genre);
    this.showForm = true;
  }

  public annulerEditer() {
    this.editingLivre = null;
    this.showForm = false;
    this.livreForm.reset();
  }

  public supprimer (livre: LivreDto) {
    this.livreService.deleteById(livre.id);
  }

  
}
