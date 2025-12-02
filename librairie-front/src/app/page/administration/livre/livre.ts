import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LivreDto } from '../../../dto/livre-dto';
import { LivreService } from '../../../service/livre-service';

import { ArticleDto } from '../../../dto/article-dto';
import { ArticleService } from '../../../service/article-service';

@Component({
  selector: 'livre',
  imports: [ CommonModule,  ReactiveFormsModule],
  templateUrl: './livre.html',
  styleUrl: '../admin.css',
})
export class Livre implements OnInit {
  protected livre$!: Observable<LivreDto[]>;
  auteur$!: Observable<any[]>;
  genre$!: Observable<any[]>;

  protected showForm: boolean = false
  protected livreForm!: FormGroup;
  protected anneeCtrl!: FormControl;
  protected auteurIdCtrl!: FormControl
  protected genreIdCtrl!: FormControl;

  protected editingLivre!: LivreDto | null;

  constructor(private livreService: LivreService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.livre$ = this.livreService.findAll();
    this.anneeCtrl = this.formBuilder.control(0);
    this.auteurIdCtrl = this.formBuilder.control(0);
    this.genreIdCtrl = this.formBuilder.control(0);
    this.livreForm = this.formBuilder.group({
      annee: this.anneeCtrl,
      auteurId: this.auteurIdCtrl,
      genreId: this.genreIdCtrl
    });
  }

  public trackLivre(index: number, value: LivreDto) {
    return value.id;
  }

  public creerOuModifier() {
    if (this.editingLivre) {
      this.livreService.save(new LivreDto(this.editingLivre.id, this.editingLivre.stock, this.editingLivre.libelle, this.editingLivre.prix, this.anneeCtrl.value, this.auteurIdCtrl.value, this.genreIdCtrl.value));
    } else {
      const newArticle = new ArticleDto(0, 0, '', 0);
      this.livreService.save(new LivreDto(0, newArticle.stock, newArticle.libelle, newArticle.prix, this.anneeCtrl.value, this.auteurIdCtrl.value, this.genreIdCtrl.value));
    }

    this.showForm = false;
    this.editingLivre = null;
    this.livreForm.reset();
  }

  public editer (livre: LivreDto) {
    this.editingLivre = livre;
    this.anneeCtrl.setValue(livre.annee);
    this.auteurIdCtrl.setValue(livre.auteurId);
    this.genreIdCtrl.setValue(livre.genreId);
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
