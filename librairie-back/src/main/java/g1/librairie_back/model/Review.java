package g1.librairie_back.model;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonView;

import g1.librairie_back.view.Views;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "review")
public class Review {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@JsonView(Views.Common.class)
	private Integer id;
	@Column(name="review", columnDefinition="VARCHAR(300)", nullable = false)
    @JsonView(Views.Common.class)
    private String review;

    @Column(name="note", nullable = false)
    @JsonView(Views.Common.class)
    private int note;

    @JsonView(Views.Common.class)
    @Column(name="date_review")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateReview;

    @ManyToOne
    @JoinColumn(name="client", nullable = false)
    @JsonView(Views.Review.class) 
    private Client client;

    @ManyToOne
    @JoinColumn(name="article", nullable = false)
    @JsonView(Views.Review.class)
    private Article article;
	
	
	public Review() {}


	public Review(Integer id, String review, int note, LocalDate dateReview, Client client, Article article) {
		super();
		this.id = id;
		this.review = review;
		this.note = note;
		this.dateReview = dateReview;
		this.client = client;
		this.article = article;
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


	@Override
	public String toString() {
		return "Review [id=" + id + ", review=" + review + ", note=" + note + ", dateReview=" + dateReview + ", client="
				+ client + ", article=" + article + "]";
	}
	
	

	
}
