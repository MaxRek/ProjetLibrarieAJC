import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ClientDto } from '../../../dto/client-dto';
import { ClientService } from '../../../service/client-service';

import { CompteDto } from '../../../dto/compte-dto';
import { CompteService } from '../../../service/compte-service';


import { RouterModule } from '@angular/router';
@Component({
  selector: 'client',
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './client.html',
  styleUrl: '../admin.css',
})
export class Client implements OnInit {
  protected client$!: Observable<ClientDto[]>;

  protected showForm: boolean = false;
  protected clientForm!: FormGroup;
  protected nomCtrl!: FormControl;
  protected prenomCtrl!: FormControl;
  protected emailCtrl!: FormControl;
  protected passwordCtrl!: FormControl;  

  protected editingClient!: ClientDto | null;

  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.client$ = this.clientService.findAll();
    this.nomCtrl = this.formBuilder.control('');
    this.prenomCtrl = this.formBuilder.control('');
    this.emailCtrl = this.formBuilder.control('');
    this.passwordCtrl = this.formBuilder.control('');

    this.clientForm = this.formBuilder.group({
      nom: this.nomCtrl,
      prenom: this.prenomCtrl,
      email: this.emailCtrl,
      password: this.passwordCtrl,
    
    });
  }

  public trackClient(index: number, client: ClientDto) {
    return client.id;
  }

  public creerOuModifier() {
    if (this.editingClient) {
      this.clientService.save(
        new ClientDto(
          this.editingClient.id,
          this.nomCtrl.value,
          this.prenomCtrl.value,
          this.emailCtrl.value,
          this.passwordCtrl.value
      ));
    } else {
      this.clientService.save(
        new ClientDto(
          0,
          this.nomCtrl.value,
          this.prenomCtrl.value,
          this.emailCtrl.value,
          this.passwordCtrl.value
      ));
    }
    this.showForm = false;
    this.editingClient = null;
    this.clientForm.reset();
  }

  public editer (client: ClientDto) {
    this.editingClient = client;
    this.nomCtrl.setValue(client.nom);
    this.prenomCtrl.setValue(client.prenom);
    this.emailCtrl.setValue(client.email);
    this.passwordCtrl.setValue(client.password);
    this.showForm = true;
  }

  public annulerEditer() {
    this.editingClient = null;
    this.showForm = false;
    this.clientForm.reset();
  }

  public supprimer(client: ClientDto) {
    this.clientService.deleteById(client.id);
  }

}
