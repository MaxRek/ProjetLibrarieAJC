import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SuiviDto } from '../../../dto/suivi-dto';
import { SuiviService } from '../../../service/suivi-service';

@Component({
  selector: 'suivi',
  imports: [ CommonModule,  ReactiveFormsModule],
  templateUrl: './suivi.html',
  styleUrl: '../admin.css',
})
export class Suivi implements OnInit {
  protected suivi$!: Observable<SuiviDto[]>;

  protected showForm: boolean = false;

  protected suiviForm!: FormGroup
  
  protected articleIdCtrl!: FormControl;
  protected clientIdCtrl!: FormControl;

  protected editingSuivi!: SuiviDto | null;

  constructor(private suiviService: SuiviService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.suivi$ = this.suiviService.findAll();
    
    this.articleIdCtrl = this.formBuilder.control(0, Validators.required);
    this.clientIdCtrl = this.formBuilder.control(0, Validators.required);

    this.suiviForm = this.formBuilder.group({
      articleId: this.articleIdCtrl,
      clientId: this.clientIdCtrl,
    });
  }

  public trackSuivi(index: number, value: SuiviDto) {
    return value.id;
  }

  public creerOuModifier() {
    if (this.editingSuivi) {
      this.suiviService.save(new SuiviDto(
        this.editingSuivi.id, 
        this.articleIdCtrl.value,
        this.clientIdCtrl.value
    ));
    } 
    else {
      this.suiviService.save(new SuiviDto(
        0, 
        this.articleIdCtrl.value,
        this.clientIdCtrl.value
      ));
    }
    this.showForm = false;
    this.editingSuivi = null;
    this.suiviForm.reset();
  }

  public editer (suivi: SuiviDto) {
    this.editingSuivi = suivi;
    this.articleIdCtrl.setValue(suivi.articleId);
    this.clientIdCtrl.setValue(suivi.clientId);
    this.showForm = true;
  }

  public supprimer (suivi: SuiviDto) {
    this.suiviService.deleteById(suivi.id);
  }

}
