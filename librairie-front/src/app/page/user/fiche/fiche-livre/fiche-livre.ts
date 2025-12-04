import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivreService } from '../../../../service/livre-service';

@Component({
  selector: 'app-fiche-livre',
  imports: [],
  templateUrl: './fiche-livre.html',
  styleUrl: './fiche-livre.css',
})
export class FicheLivre implements OnInit {
  livre: any;

  constructor(private route: ActivatedRoute,private livreService: LivreService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.livreService.findById(id).subscribe(data => {this.livre = data;});
  }
}
