import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PapeterieDto } from '../../dto/papeterie-dto';

import { PapeterieService } from '../../service/papeterie-service';

import { ArticleDto } from '../../dto/article-dto';
import { ArticleService } from '../../service/article-service';

@Component({
  selector: 'papeterie',
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './papeterie.html',
  styleUrl: './papeterie.css',
})
export class Papeterie {
  protected papeterie$!: Observable<PapeterieDto[]>;

  protected showForm: boolean = false;
  protected papeterieForm!: FormGroup;
  protected typeCtrl!: FormControl;
  protected marqueCtrl!: FormControl;

  protected editingPapeterie!: PapeterieDto | null;

  constructor(private papeterieService: PapeterieService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.papeterie$ = this.papeterieService.findAll();
    
    this.typeCtrl = this.formBuilder.control('');
    this.marqueCtrl = this.formBuilder.control('');
    
    this.papeterieForm = this.formBuilder.group({
      type: this.typeCtrl,
      marque: this.marqueCtrl
    });
  }

  public trackPapeterie(index: number, value: PapeterieDto) {
    return value.id;
  }

  public creerOuModifier() {
    if (this.editingPapeterie) {
      this.papeterieService.save(new PapeterieDto(this.editingPapeterie.id, this.editingPapeterie.stock, this.editingPapeterie.libelle, this.editingPapeterie.prix, this.typeCtrl.value, this.marqueCtrl.value));
    } else {
      const newArticle = new ArticleDto(0, 0, '', 0);
      this.papeterieService.save(new PapeterieDto(0, newArticle.stock, newArticle.libelle, newArticle.prix, this.typeCtrl.value, this.marqueCtrl.value));
    }

    this.showForm = false;
    this.editingPapeterie = null;
    this.papeterieForm.reset();
  }

  public editer (papeterie: PapeterieDto) {
    this.editingPapeterie = papeterie;
    this.typeCtrl.setValue(papeterie.type);
    this.marqueCtrl.setValue(papeterie.marque);
    this.showForm = true;
  }

  public annulerEditer() {
    this.showForm = false;
    this.editingPapeterie = null;
    this.papeterieForm.reset();
  }

  public supprimer (papeterie: PapeterieDto) {
    this.papeterieService.deleteById(papeterie.id);
  }


}
