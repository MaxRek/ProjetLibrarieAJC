import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { PanierDto } from '../../../dto/panier-dto';
import { PanierService } from '../../../service/panier-service';
import { ClientService } from '../../../service/client-service';
import { ArticleDto } from '../../../dto/article-dto';
import { LivreService } from '../../../service/livre-service';
import { PapeterieService } from '../../../service/papeterie-service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'panier',
  imports: [ CommonModule,  ReactiveFormsModule],
  templateUrl: './panier.html',
  styleUrl: '../admin.css',
})
export class Panier implements OnInit {
  protected panier$!: Observable<PanierDto[]>;
  client$!: Observable<any[]>;
  article$!: Observable<ArticleDto[]>;

  protected showForm: boolean = false;

  protected panierForm!: FormGroup
  
  protected datePanierCtrl!: FormControl;
  protected prixCtrl!: FormControl;
  protected quantiteCtrl!: FormControl;
  protected articleIdCtrl!: FormControl;
  protected clientIdCtrl!: FormControl;

  protected editingPanier!: PanierDto | null;

  constructor(private panierService: PanierService,
    private clientService: ClientService, 
    private livreService: LivreService,
    private papeterieService: PapeterieService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.panier$ = this.panierService.findAll();
    this.client$ = this.clientService.findAll();
    
    this.article$ = combineLatest([
      this.livreService.findAll(),
      this.papeterieService.findAll()
    ]).pipe(
      map(([livres, papeteries]) => {
        const all: ArticleDto[] = [...livres, ...papeteries];
        return all;
      })
    );

    this.quantiteCtrl = this.formBuilder.control(0, Validators.required);
    this.articleIdCtrl = this.formBuilder.control(0, Validators.required);
    this.clientIdCtrl = this.formBuilder.control(0, Validators.required);

    this.panierForm = this.formBuilder.group({
      quantite: this.quantiteCtrl,
      articleId: this.articleIdCtrl,
      clientId: this.clientIdCtrl,
    });
  }

  public trackPanier(index: number, value: PanierDto) {
    return value.id;
  }

  public creerOuModifier() {
    if (this.editingPanier) {
      this.panierService.save(new PanierDto(
        this.editingPanier.id, 
        this.quantiteCtrl.value,
        this.articleIdCtrl.value,
        this.clientIdCtrl.value
    ));
    } 
    else {
      this.panierService.save(new PanierDto(
        0, 
        this.quantiteCtrl.value,
        this.articleIdCtrl.value,
        this.clientIdCtrl.value
      ));
    }
    this.showForm = false;
    this.editingPanier = null;
    this.panierForm.reset();
  }

  public editer (panier: PanierDto) {
    this.editingPanier = panier;
    this.quantiteCtrl.setValue(panier.quantite);
    this.articleIdCtrl.setValue(panier.articleId);
    this.clientIdCtrl.setValue(panier.clientId);
    this.showForm = true;
  }

  public supprimer (panier: PanierDto) {
    this.panierService.deleteById(panier.id);
  }

}
