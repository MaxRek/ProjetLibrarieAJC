import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewDto } from '../../../dto/review-dto';
import { ReviewService } from '../../../service/review-service';

@Component({
  selector: 'review',
  imports: [ CommonModule,  ReactiveFormsModule],
  templateUrl: './review.html',
  styleUrl: '../admin.css',
})
export class Review implements OnInit {
  protected review$!: Observable<ReviewDto[]>;

  protected showForm: boolean = false;

  protected reviewForm!: FormGroup
  
  protected dateReviewCtrl!: FormControl;
  protected noteCtrl!: FormControl;
  protected reviewCtrl!: FormControl;
  protected articleIdCtrl!: FormControl;
  protected clientIdCtrl!: FormControl;

  protected editingReview!: ReviewDto | null;

  constructor(private reviewService: ReviewService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.review$ = this.reviewService.findAll();
    
    this.dateReviewCtrl = this.formBuilder.control('');
    this.noteCtrl = this.formBuilder.control(0, Validators.required);
    this.reviewCtrl = this.formBuilder.control(0, Validators.required);
    this.articleIdCtrl = this.formBuilder.control(0, Validators.required);
    this.clientIdCtrl = this.formBuilder.control(0, Validators.required);

    this.reviewForm = this.formBuilder.group({
      dateReview: this.dateReviewCtrl,
      note: this.noteCtrl,
      review: this.reviewCtrl,
      articleId: this.articleIdCtrl,
      clientId: this.clientIdCtrl,
    });
  }

  public trackReview(index: number, value: ReviewDto) {
    return value.id;
  }

  public creerOuModifier() {
    if (this.editingReview) {
      this.reviewService.save(new ReviewDto(
        this.editingReview.id, 
        this.dateReviewCtrl.value, 
        this.noteCtrl.value, 
        this.reviewCtrl.value,
        this.articleIdCtrl.value,
        this.clientIdCtrl.value
    ));
    } 
    else {
      this.reviewService.save(new ReviewDto(
        0, 
        this.dateReviewCtrl.value, 
        this.noteCtrl.value, 
        this.reviewCtrl.value,
        this.articleIdCtrl.value,
        this.clientIdCtrl.value
      ));
    }
    this.showForm = false;
    this.editingReview = null;
    this.reviewForm.reset();
  }

  public editer (review: ReviewDto) {
    this.editingReview = review;
    this.dateReviewCtrl.setValue(review.dateReview);
    this.noteCtrl.setValue(review.note);
    this.reviewCtrl.setValue(review.review);
    this.articleIdCtrl.setValue(review.articleId);
    this.clientIdCtrl.setValue(review.clientId);
    this.showForm = true;
  }

  public supprimer (review: ReviewDto) {
    this.reviewService.deleteById(review.id);
  }

}
