package g1.librairie_back.dto.response;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;

import g1.librairie_back.dao.IDAOCompte;
import g1.librairie_back.model.Article;
import g1.librairie_back.model.Client;
import g1.librairie_back.model.Review;

public class ReviewResponse {
	private Integer id;
	private String review;
	private int note;
	private LocalDate dateReview;
	private Integer clientId;
	private Integer articleId;

	
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

	

	public Integer getClientId() {
		return clientId;
	}

	public void setClientId(Integer clientId) {
		this.clientId = clientId;
	}

	public Integer getArticleId() {
		return articleId;
	}

	public void setArticleId(Integer articleId) {
		this.articleId = articleId;
	}

	public static ReviewResponse convert(Review review) {
		ReviewResponse resp = new ReviewResponse();
        
        resp.setId(review.getId());
        resp.setNote(review.getNote());
        resp.setReview(review.getReview());
        resp.setDateReview(review.getDateReview());
        resp.setArticleId(review.getArticle().getId());
        resp.setClientId(review.getClient().getId());
        return resp;
    }
}
