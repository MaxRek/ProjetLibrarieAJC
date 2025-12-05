import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LivreService } from '../../../../service/livre-service';
import { Observable } from 'rxjs';
import { LivreDto } from '../../../../dto/livre-dto';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'ficheLivre',
  imports: [AsyncPipe, RouterLink, CommonModule],
  templateUrl: './fiche-livre.html',
  styleUrl: './fiche-livre.css',
})
export class FicheLivre implements OnInit {
  protected livre$!: Observable<LivreDto>;
  livre: any;

  constructor(private route: ActivatedRoute,private livreService: LivreService) {}

  ngOnInit(): void {
   const id = Number(this.route.snapshot.paramMap.get('id'));
   this.livre$=this.livreService.findById(id);
  }
}
