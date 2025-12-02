package g1.librairie_back.model;

import java.time.LocalDate;

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
@Table(name = "achat")
public class Achat {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonView(Views.Common.class)
	private Integer id;
	
    @JsonView(Views.Common.class)
    @Column(name = "date_achat", nullable = false)
	private LocalDate dateAchat;
    
    @Column(name = "prix", columnDefinition = "DECIMAL(7,2)", nullable = false)
    @JsonView(Views.Common.class)
	private Double prix;
    
    @Column(name = "quantite", nullable = false)
    @JsonView(Views.Common.class)
	private int quantiteAchat;

	@ManyToOne
	@JoinColumn(name = "client",nullable = false)
	@JsonView(Views.AchatWithClient.class)
	private Client client;
	
	@ManyToOne
	@JoinColumn(name = "article",nullable = false)
	@JsonView(Views.AchatWithArticle.class)
	private Article article;
	
	public Achat() {}
	
	public Achat(LocalDate dateAchat, Double prix, int quantiteAchat, Article article, Client client) {
		this.dateAchat = dateAchat;
		this.prix = prix;
		this.quantiteAchat = quantiteAchat;
		this.article = article;
        this.client = client;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public LocalDate getDateAchat() {
		return dateAchat;
	}

	public void setDateAchat(LocalDate dateAchat) {
		this.dateAchat = dateAchat;
	}

	public Double getPrix() {
		return prix;
	}

	public void setPrix(Double prix) {
		this.prix = prix;
	}

	public int getQuantiteAchat() {
		return quantiteAchat;
	}

	public void setQuantiteAchat(int quantiteAchat) {
		this.quantiteAchat = quantiteAchat;
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
