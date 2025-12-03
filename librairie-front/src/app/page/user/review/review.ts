import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewDto } from '../../../dto/review-dto';
import { ReviewService } from '../../../service/review-service';

@Component({
  selector: 'review-user',
  imports: [ CommonModule,  ReactiveFormsModule],
  templateUrl: './review.html',
  styleUrl: '../admin.css',
})
export class ReviewUser implements OnInit {
  protected review$!: Observable<ReviewDto[]>;

  // Je mets un id pour l'instant mais après on devra réccupérer un vrai id grace au login
  private clientId = 1;

  protected showForm: boolean = false;

  protected reviewForm!: FormGroup
  
  protected noteCtrl!: FormControl;
  protected reviewCtrl!: FormControl;

  protected editingReview!: ReviewDto | null;

  constructor(private reviewService: ReviewService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.review$ = this.reviewService.findByClient(this.clientId);
    
    this.noteCtrl = this.formBuilder.control('');
    this.reviewCtrl = this.formBuilder.control(0);

    this.reviewForm = this.formBuilder.group({
      note: this.noteCtrl,
      review: this.reviewCtrl,
    });
  }

  public trackReview(index: number, value: ReviewDto) {
    return value.id;
  }

  public editer (review: ReviewDto) {
    this.editingReview = review;
    this.noteCtrl.setValue(review.note);
    this.reviewCtrl.setValue(review.review);
    this.showForm = true;
  }

  public valider(): void {
    if (!this.editingReview) return;

    const dto = new ReviewDto(
      this.editingReview.id,
      this.reviewCtrl.value,
      this.noteCtrl.value,
      this.editingReview.dateReview,
      this.editingReview.articleId,
      this.clientId
    );
    this.reviewService.save(dto);
    this.showForm = false;
    this.editingReview = null;
    this.reviewForm.reset();
  }

  public annuler(): void {
    this.showForm = false;
    this.editingReview = null;
    this.reviewForm.reset();
  }

  public supprimer (review: ReviewDto) {
    this.reviewService.deleteById(review.id);
  }

}
