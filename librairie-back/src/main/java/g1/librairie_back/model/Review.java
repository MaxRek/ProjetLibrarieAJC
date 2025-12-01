package g1.librairie_back.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonView;

import g1.librairie_back.view.Views;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
@Entity
public class Review {
	
	@JsonView(Views.Common.class)
	private Integer id;
	
	@JsonView(Views.Common.class)
	private String review;
	
	@JsonView(Views.Common.class)
	private int note;
	
	@JsonView(Views.Common.class)
	private LocalDate dateReview;

	@ManyToOne
	@JoinColumn(name="client",nullable = false)
	private Client client;
	
	@ManyToOne
	@JoinColumn(name="article",nullable = false)
	private Article article;
	
	
	public Review() {}
	
	public Review(String review, int note, LocalDate dateReview) {
		super();
		this.review = review;
		this.note = note;
		this.dateReview = dateReview;
	}

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

	@Override
	public String toString() {
		return "Panier [id=" + id + ", review=" + review + ", note=" + note + ", dateReview=" + dateReview + "]";
	}
	
}
