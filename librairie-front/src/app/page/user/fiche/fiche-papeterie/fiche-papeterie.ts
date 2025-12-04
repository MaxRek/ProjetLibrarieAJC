import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PapeterieDto } from '../../../../dto/papeterie-dto';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PapeterieService } from '../../../../service/papeterie-service';

@Component({
  selector: 'app-fiche-papeterie',
  imports: [AsyncPipe, CommonModule,RouterLink
  ],
  templateUrl: './fiche-papeterie.html',
  styleUrl: './fiche-papeterie.css',
})
export class FichePapeterie implements OnInit{
protected papeterie$!: Observable<PapeterieDto>;
  livre: any;

  constructor(private route: ActivatedRoute,private papeterieService: PapeterieService) {}

  ngOnInit(): void {
   const id = Number(this.route.snapshot.paramMap.get('id'));
   this.papeterie$=this.papeterieService.findById(id);
  }
}
