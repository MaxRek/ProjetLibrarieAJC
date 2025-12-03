import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AchatDto } from '../../../dto/achat-dto';
import { AchatService } from '../../../service/achat-service';

@Component({
  selector: 'achat',
  imports: [ CommonModule,  ReactiveFormsModule],
  templateUrl: './achat.html',
  styleUrl: '../admin.css',
})
export class Achat implements OnInit {
  protected achat$!: Observable<AchatDto[]>;

  protected showForm: boolean = false;

  protected achatForm!: FormGroup
  
  protected dateAchatCtrl!: FormControl;
  protected prixCtrl!: FormControl;
  protected quantiteAchatCtrl!: FormControl;
  protected articleIdCtrl!: FormControl;
  protected clientIdCtrl!: FormControl;

  protected editingAchat!: AchatDto | null;

  constructor(private achatService: AchatService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.achat$ = this.achatService.findAll();
    
    this.dateAchatCtrl = this.formBuilder.control('');
    this.prixCtrl = this.formBuilder.control(0);
    this.quantiteAchatCtrl = this.formBuilder.control(0);
    this.articleIdCtrl = this.formBuilder.control(0);
    this.clientIdCtrl = this.formBuilder.control(0);

    this.achatForm = this.formBuilder.group({
      dateAchat: this.dateAchatCtrl,
      prix: this.prixCtrl,
      quantiteAchat: this.quantiteAchatCtrl,
      articleId: this.articleIdCtrl,
      clientId: this.clientIdCtrl,
    });
  }

  public trackAchat(index: number, value: AchatDto) {
    return value.id;
  }

  public creerOuModifier() {
    if (this.editingAchat) {
      this.achatService.save(new AchatDto(
        this.editingAchat.id, 
        this.dateAchatCtrl.value, 
        this.prixCtrl.value, 
        this.quantiteAchatCtrl.value,
        this.articleIdCtrl.value,
        this.clientIdCtrl.value
    ));
    } 
    else {
      this.achatService.save(new AchatDto(
        0, 
        this.dateAchatCtrl.value, 
        this.prixCtrl.value, 
        this.quantiteAchatCtrl.value,
        this.articleIdCtrl.value,
        this.clientIdCtrl.value
      ));
    }
    this.showForm = false;
    this.editingAchat = null;
    this.achatForm.reset();
  }

  public editer (achat: AchatDto) {
    this.editingAchat = achat;
    this.dateAchatCtrl.setValue(achat.dateAchat);
    this.prixCtrl.setValue(achat.prix);
    this.quantiteAchatCtrl.setValue(achat.quantiteAchat);
    this.articleIdCtrl.setValue(achat.articleId);
    this.clientIdCtrl.setValue(achat.clientId);
    this.showForm = true;
  }

  public supprimer (achat: AchatDto) {
    this.achatService.deleteById(achat.id);
  }

}
