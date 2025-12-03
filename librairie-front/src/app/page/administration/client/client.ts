import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ClientDto } from '../../../dto/client-dto';
import { ClientService } from '../../../service/client-service';

import { CompteDto } from '../../../dto/compte-dto';
import { CompteService } from '../../../service/compte-service';


@Component({
  selector: 'client',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client.html',
  styleUrl: '../admin.css',
})
export class Client implements OnInit {
  protected client$!: Observable<ClientDto[]>;

  protected showForm: boolean = false;
  protected clientForm!: FormGroup;

  protected editingClient!: ClientDto | null;

  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.client$ = this.clientService.findAll();

    this.clientForm = this.formBuilder.group({
    
    });
  }

  public trackClient(index: number, client: ClientDto) {
    return client.id;
  }

  public creerOuModifier() {
    if (this.editingClient) {
      this.clientService.save(new ClientDto(
        this.editingClient.id,
        this.editingClient.nom,
        this.editingClient.prenom,
        this.editingClient.email,
        this.editingClient.password
      ));
    } else {
      const newCompte = this.clientForm.value;
      this.clientService.save(new ClientDto(
        0,
        newCompte.nom,
        newCompte.prenom,
        newCompte.email,
        newCompte.password
      ));
    }
    this.showForm = false;
    this.editingClient = null;
    this.clientForm.reset();
  }

  public editer (client: ClientDto) {
    this.editingClient = client;
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
