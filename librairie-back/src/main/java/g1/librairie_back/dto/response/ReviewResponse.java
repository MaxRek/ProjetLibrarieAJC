package g1.librairie_back.dto.response;

import java.time.LocalDate;

import g1.librairie_back.model.Review;

public class ReviewResponse {
	private Integer id;
	private String review;
	private int note;
	private LocalDate dateReview;
	
	

	public Integer getId() {
		return id;
	}



	public void setId(Integer id) {
		this.id = id;
	}



	public String getReview() {
		return review;
	}



	public void setReview(String review) {
		this.review = review;
	}



	public int getNote() {
		return note;
	}



	public void setNote(int note) {
		this.note = note;
	}



	public LocalDate getDateReview() {
		return dateReview;
	}



	public void setDateReview(LocalDate dateReview) {
		this.dateReview = dateReview;
	}



	public static ReviewResponse convert(Review review) {
		ReviewResponse resp = new ReviewResponse();
        
        resp.setId(review.getId());
        resp.setNote(review.getNote());
        resp.setReview(review.getReview());
        resp.setDateReview(review.getDateReview());
        
        return resp;
    }
}
