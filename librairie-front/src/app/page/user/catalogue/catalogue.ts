import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LivreDto } from '../../../dto/livre-dto';
import { LivreService } from '../../../service/livre-service';
import { PapeterieDto } from '../../../dto/papeterie-dto';
import { PapeterieService } from '../../../service/papeterie-service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'catalogue',
  imports: [CommonModule,RouterModule],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css',
})
export class Catalogue {
  protected livre$!: Observable<LivreDto[]>;
  protected papeterie$!: Observable<PapeterieDto[]>;
  
  
  protected showLivre: boolean = false;
  protected showPapeterie: boolean = false;

  constructor(
    private livreService: LivreService,
    private papeterieService: PapeterieService
    ) {}

    ngOnInit(): void {
    this.livre$ = this.livreService.findAll();
    this.papeterie$ = this.papeterieService.findAll();
    }

    trackByCatalogueId(index: number, item: LivreDto | PapeterieDto): number {
      return item.id;
        }

}
