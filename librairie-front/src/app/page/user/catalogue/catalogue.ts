import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest, startWith, map } from 'rxjs';
import { LivreDto } from '../../../dto/livre-dto';
import { LivreService } from '../../../service/livre-service';
import { PapeterieDto } from '../../../dto/papeterie-dto';
import { PapeterieService } from '../../../service/papeterie-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'catalogue',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css',
})
export class Catalogue implements OnInit {
  protected livre$!: Observable<LivreDto[]>;
  protected papeterie$!: Observable<PapeterieDto[]>;

  // observables filtrés
  protected filteredLivres$!: Observable<LivreDto[]>;
  protected filteredPapeteries$!: Observable<PapeterieDto[]>;

  // champ de recherche
  protected searchCtrl = new FormControl<string>('', { nonNullable: true });

  protected showLivre: boolean = false;
  protected showPapeterie: boolean = false;

  constructor(
    private livreService: LivreService,
    private papeterieService: PapeterieService
  ) {}

  ngOnInit(): void {
    this.livre$ = this.livreService.findAll();
    this.papeterie$ = this.papeterieService.findAll();

    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value.toLowerCase())
    );

    this.filteredLivres$ = combineLatest([this.livre$, search$]).pipe(
      map(([livres, term]) => {
        const t = term.toLowerCase();
        if (!t) { return livres; }

        return livres.filter(l =>
          l.libelle.toLowerCase().includes(t) ||
          l.auteur?.nom?.toLowerCase().includes(t) ||
          l.auteur?.prenom?.toLowerCase().includes(t) ||
          (l.genre ? l.genre.toString().toLowerCase().includes(t) : false)
        );
      })
    );

    this.filteredPapeteries$ = combineLatest([this.papeterie$, search$]).pipe(
      map(([paps, term]) => {
        const t = term.toLowerCase();
        if (!t) { return paps; }

        return paps.filter(p =>
          p.libelle.toLowerCase().includes(t) ||
          p.type.toLowerCase().includes(t) ||
          p.marque.toLowerCase().includes(t)
        );
      })
    );
  }

  trackByCatalogueId(index: number, item: LivreDto | PapeterieDto): number {
    return item.id;
  }

  annulerRecherche(): void {
    this.searchCtrl.setValue('');
  }
}
