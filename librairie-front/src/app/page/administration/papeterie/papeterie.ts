import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

import { PapeterieDto } from '../../../dto/papeterie-dto';
import { PapeterieService } from '../../../service/papeterie-service';


@Component({
  selector: 'papeterie',
  imports: [ CommonModule, ReactiveFormsModule, RouterModule,RouterModule],
  templateUrl: './papeterie.html',
  styleUrl: '../admin.css',
})
export class Papeterie implements OnInit {
  protected papeterie$!: Observable<PapeterieDto[]>;

  protected showForm: boolean = false;
  protected papeterieForm!: FormGroup;
  protected libelleCtrl!: FormControl;
  protected prixCtrl!: FormControl;
  protected stockCtrl!: FormControl;
  protected typeCtrl!: FormControl;
  protected marqueCtrl!: FormControl;

  protected editingPapeterie!: PapeterieDto | null;

  constructor(private papeterieService: PapeterieService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.papeterie$ = this.papeterieService.findAll();
    this.libelleCtrl = this.formBuilder.control('');
    this.prixCtrl = this.formBuilder.control(0);
    this.stockCtrl = this.formBuilder.control(0);
    this.typeCtrl = this.formBuilder.control('');
    this.marqueCtrl = this.formBuilder.control('');
    
    this.papeterieForm = this.formBuilder.group({
      libelle: this.libelleCtrl,
      prix: this.prixCtrl,
      stock: this.stockCtrl,
      type: this.typeCtrl,
      marque: this.marqueCtrl,

    });
  }

  public trackPapeterie(index: number, value: PapeterieDto) {
    return value.id;
  }

  public creerOuModifier() {
    if (this.editingPapeterie) {
      this.papeterieService.save(
        new PapeterieDto(
          this.editingPapeterie.id, 
          this.stockCtrl.value, 
          this.libelleCtrl.value, 
          this.prixCtrl.value, 
          this.typeCtrl.value, 
          this.marqueCtrl.value
        )
      );
    } else {
      this.papeterieService.save(
        new PapeterieDto(
          0, 
          this.stockCtrl.value, 
          this.libelleCtrl.value, 
          this.prixCtrl.value, 
          this.typeCtrl.value, 
          this.marqueCtrl.value
        )
      );
    }

    this.showForm = false;
    this.editingPapeterie = null;
    this.papeterieForm.reset();
  }

  public editer (papeterie: PapeterieDto) {
    this.editingPapeterie = papeterie;
    this.libelleCtrl.setValue(papeterie.libelle);
    this.prixCtrl.setValue(papeterie.prix);
    this.stockCtrl.setValue(papeterie.stock);
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
