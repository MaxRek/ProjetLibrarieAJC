package g1.librairie_back.dto.request;

import java.time.LocalDate;

import g1.librairie_back.model.Article;
import g1.librairie_back.model.Client;
import jakarta.validation.constraints.NotBlank;

public class CreateReviewRequest {
	
    private Integer id;
	
    @NotBlank
	private String review;
	
	private int note;
	
	private LocalDate dateReview;
	
	private Article article;
	
	private Client client;

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

	public Article getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article = article;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}
	
	
	
}
