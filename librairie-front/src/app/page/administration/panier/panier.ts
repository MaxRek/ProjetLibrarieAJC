import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PanierDto } from '../../../dto/panier-dto';
import { PanierService } from '../../../service/panier-service';

@Component({
  selector: 'panier',
  imports: [ CommonModule,  ReactiveFormsModule],
  templateUrl: './panier.html',
  styleUrl: '../admin.css',
})
export class Panier implements OnInit {
  protected panier$!: Observable<PanierDto[]>;

  protected showForm: boolean = false;

  protected panierForm!: FormGroup
  
  protected datePanierCtrl!: FormControl;
  protected prixCtrl!: FormControl;
  protected quantiteCtrl!: FormControl;
  protected articleIdCtrl!: FormControl;
  protected clientIdCtrl!: FormControl;

  protected editingPanier!: PanierDto | null;

  constructor(private panierService: PanierService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.panier$ = this.panierService.findAll();
    
    this.quantiteCtrl = this.formBuilder.control(0);
    this.articleIdCtrl = this.formBuilder.control(0);
    this.clientIdCtrl = this.formBuilder.control(0);

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
