package g1.librairie_back.dto.response;

import java.time.LocalDate;

import g1.librairie_back.model.Article;
import g1.librairie_back.model.Client;
import g1.librairie_back.model.Review;

public class ReviewResponse {
	private Integer id;
	private String review;
	private int note;
	private LocalDate dateReview;
	private Client client;
	private Article article;

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

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public Article getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article = article;
	}

	public static ReviewResponse convert(Review review) {
		ReviewResponse resp = new ReviewResponse();
        
        resp.setId(review.getId());
        resp.setNote(review.getNote());
        resp.setReview(review.getReview());
        resp.setDateReview(review.getDateReview());
        resp.setArticle(review.getArticle());
        
        return resp;
    }
}
