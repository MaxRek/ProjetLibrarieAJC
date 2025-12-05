import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PanierDto } from '../../../dto/panier-dto';
import { PanierService } from '../../../service/panier-service';
import { AuthService } from '../../../service/auth-service';

@Component({
  selector: 'panier-user',
  imports: [ CommonModule,  ReactiveFormsModule],
  templateUrl: './panier.html',
  styleUrl: '../user.css',
})
export class PanierUser implements OnInit {
  protected panier$!: Observable<PanierDto[]>;

  private clientId!: number;

  protected showForm: boolean = false;

  protected panierForm!: FormGroup
  
  protected quantiteCtrl!: FormControl;

  protected editingPanier!: PanierDto | null;

  constructor(
    private panierService: PanierService, 
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    // Récupère l'id client comme STRING depuis l'auth
    const idClientStr = this.authService.idClient;
    // je mets en number c'est mieux
    this.clientId = Number(idClientStr);

    this.panier$ = this.panierService.findByClient(this.clientId);
    
    this.quantiteCtrl = this.formBuilder.control(1);

    this.panierForm = this.formBuilder.group({
      quantite: this.quantiteCtrl,
    });
  }

  public trackPanier(index: number, value: PanierDto) {
    return value.id;
  }

  public editer (panier: PanierDto) {
    this.editingPanier = panier;
    this.quantiteCtrl.setValue(panier.quantite);
    this.showForm = true;
  }

  public valider(): void {
    if (!this.editingPanier) return;

    const dto = new PanierDto(
      this.editingPanier.id,
      this.quantiteCtrl.value,
      this.editingPanier.articleId,
      this.clientId
    );
    this.panierService.save(dto);
    this.showForm = false;
    this.editingPanier = null;
    this.panierForm.reset();
  }

  public annuler(): void {
    this.showForm = false;
    this.editingPanier = null;
    this.panierForm.reset();
  }

  public supprimer (panier: PanierDto) {
    this.panierService.deleteById(panier.id);
  }

}
