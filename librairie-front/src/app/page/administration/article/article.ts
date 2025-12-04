import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleDto } from '../../../dto/article-dto';
import { ArticleService } from '../../../service/article-service';

import { RouterModule } from '@angular/router';
@Component({
  selector: 'article',
  imports: [ CommonModule,  ReactiveFormsModule,RouterModule],
  templateUrl: './article.html',
  styleUrl: '../admin.css',
})
export class Article implements OnInit {
  protected article$!: Observable<ArticleDto[]>;

  protected showForm: boolean = false;
  protected articleForm!: FormGroup
  protected libelleCtrl!: FormControl;
  protected prixCtrl!: FormControl;
  protected stockCtrl!: FormControl;

  protected editingArticle!: ArticleDto | null;

  constructor(private articleService: ArticleService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.article$ = this.articleService.findAll();
    
    this.libelleCtrl = this.formBuilder.control('', Validators.required);
    this.prixCtrl = this.formBuilder.control(0, Validators.required);
    this.stockCtrl = this.formBuilder.control(0, Validators.required);

    this.articleForm = this.formBuilder.group({
      libelle: this.libelleCtrl,
      prix: this.prixCtrl,
      stock: this.stockCtrl
    });
  }

  public trackArticle(index: number, value: ArticleDto) {
    return value.id;
  }

  public creerOuModifier() {
    if (this.editingArticle) {
      this.articleService.save(new ArticleDto(this.editingArticle.id, this.libelleCtrl.value, this.prixCtrl.value, this.stockCtrl.value));
    } else {
      this.articleService.save(new ArticleDto(0, this.libelleCtrl.value, this.prixCtrl.value, this.stockCtrl.value));
    }
    this.showForm = false;
    this.editingArticle = null;
    this.articleForm.reset();
  }

  public editer (article: ArticleDto) {
    this.editingArticle = article;
    this.libelleCtrl.setValue(article.libelle);
    this.prixCtrl.setValue(article.prix);
    this.stockCtrl.setValue(article.stock);
    this.showForm = true;
  }

  public supprimer (article: ArticleDto) {
    this.articleService.deleteById(article.id);
  }

}
