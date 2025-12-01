import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleDto } from '../../dto/article-dto';

import { ArticleService } from '../../service/article-service';

@Component({
  selector: 'app-article',
  imports: [ CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './article.html',
  styleUrl: './article.css',
})
export class Article implements OnInit {
  protected article$!: Observable<ArticleDto[]>;

  protected showForm: boolean = false;
  protected articleForm!: FormGroup
  protected titreCtrl!: FormControl;
  protected prixCtrl!: FormControl;
  protected stockCtrl!: FormControl;

  protected editingArticle!: ArticleDto | null;

  constructor(private articleService: ArticleService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.article$ = this.articleService.findAll();
    
    this.titreCtrl = this.formBuilder.control('');
    this.prixCtrl = this.formBuilder.control(0);
    this.stockCtrl = this.formBuilder.control(0);

    this.articleForm = this.formBuilder.group({
      titre: this.titreCtrl,
      prix: this.prixCtrl,
      stock: this.stockCtrl
    });
  }

  public trackArticle(index: number, value: ArticleDto) {
    return value.id;
  }

  public creerOuModifier() {
    if (this.editingArticle) {
      this.articleService.save(new ArticleDto(this.editingArticle.id, this.titreCtrl.value, this.prixCtrl.value, this.stockCtrl.value));
    } else {
      this.articleService.save(new ArticleDto(0, this.titreCtrl.value, this.prixCtrl.value, this.stockCtrl.value));
    }
    this.showForm = false;
    this.editingArticle = null;
    this.articleForm.reset();
  }

  public editer (article: ArticleDto) {
    this.editingArticle = article;
    this.titreCtrl.setValue(article.libelle);
    this.prixCtrl.setValue(article.prix);
    this.stockCtrl.setValue(article.quantiteStock);
    this.showForm = true;
  }

  public supprimer (article: ArticleDto) {
    this.articleService.deleteById(article.id);
  }

}
