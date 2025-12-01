import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GenreDto } from '../../dto/genre-dto';

import { GenreService } from '../../service/genre-service';

@Component({
  selector: 'app-genre',
  imports: [ CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './genre.html',
  styleUrl: './genre.css',
})
export class Genre implements OnInit {
  protected genre$!: Observable<GenreDto[]>;

  protected showForm: boolean = false;
  protected genreForm!: FormGroup;
  protected libelleCtrl!: FormControl;

  protected editingGenre!: GenreDto | null;

  constructor(private genreService: GenreService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.genre$ = this.genreService.findAll();

    this.libelleCtrl = this.formBuilder.control('');

    this.genreForm = this.formBuilder.group({
      libelle: this.libelleCtrl
    });
  }

  public trackGenre(index: number, value: GenreDto) {
    return value.id;
  }

  public creerOuModifier() {
    if (this.editingGenre) {
      this.genreService.save(new GenreDto(this.editingGenre.id, this.libelleCtrl.value));
    } else {
      this.genreService.save(new GenreDto(0, this.libelleCtrl.value));
    }
    this.showForm = false;
    this.editingGenre = null;
    this.genreForm.reset();
  }

  public editer (genre: GenreDto) {
    this.editingGenre = genre;
    this.libelleCtrl.setValue(genre.libelle);
    this.showForm = true;
  }

  public supprimer (genre: GenreDto) {
    this.genreService.deleteById(genre.id);
  }

}
