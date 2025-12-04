import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { AchatDto } from '../../../dto/achat-dto';
import { AchatService } from '../../../service/achat-service';
import { ClientService } from '../../../service/client-service';
import { ArticleDto } from '../../../dto/article-dto';
import { LivreService } from '../../../service/livre-service';
import { PapeterieService } from '../../../service/papeterie-service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'achat',
  imports: [ CommonModule,  ReactiveFormsModule],
  templateUrl: './achat.html',
  styleUrl: '../admin.css',
})
export class Achat implements OnInit {
  protected achat$!: Observable<AchatDto[]>;
  client$!: Observable<any[]>;
  article$!: Observable<ArticleDto[]>;

  protected showForm: boolean = false;

  protected achatForm!: FormGroup
  
  protected dateAchatCtrl!: FormControl;
  protected prixCtrl!: FormControl;
  protected quantiteAchatCtrl!: FormControl;
  protected articleIdCtrl!: FormControl;
  protected clientIdCtrl!: FormControl;

  protected editingAchat!: AchatDto | null;

  constructor(private achatService: AchatService,
    private clientService: ClientService,
    private livreService: LivreService,
    private papeterieService: PapeterieService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.achat$ = this.achatService.findAll();
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
    
    this.dateAchatCtrl = this.formBuilder.control('', Validators.required);
    this.prixCtrl = this.formBuilder.control(0, Validators.required);
    this.quantiteAchatCtrl = this.formBuilder.control(0, Validators.required);
    this.articleIdCtrl = this.formBuilder.control(0, Validators.required);
    this.clientIdCtrl = this.formBuilder.control(0, Validators.required);

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
      this.achatService.save(
        new AchatDto(
          this.editingAchat.id, 
          this.dateAchatCtrl.value, 
          this.prixCtrl.value, 
          this.quantiteAchatCtrl.value,
          this.articleIdCtrl.value,
          this.clientIdCtrl.value
      ));
    } 
    else {
      this.achatService.save(
        new AchatDto(
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
