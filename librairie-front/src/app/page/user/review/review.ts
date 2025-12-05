import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewDto } from '../../../dto/review-dto';
import { ReviewService } from '../../../service/review-service';
import { AuthService } from '../../../service/auth-service';

@Component({
  selector: 'review-user',
  imports: [ CommonModule,  ReactiveFormsModule],
  templateUrl: './review.html',
  styleUrl: '../user.css',
})
export class ReviewUser implements OnInit {
  protected review$!: Observable<ReviewDto[]>;

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const clientId = Number(this.authService.idClient);
    this.review$ = this.reviewService.findByClient(clientId);
  }

  public trackReview(index: number, value: ReviewDto) {
    return value.id;
  }
}