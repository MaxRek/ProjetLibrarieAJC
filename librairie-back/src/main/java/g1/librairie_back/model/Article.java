package g1.librairie_back.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;

import g1.librairie_back.view.Views;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Article")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type_article",columnDefinition = "ENUM('Livre','Papeterie')")
public abstract class Article {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonView(Views.Common.class)
	protected Integer id;
	
	@Column(name = "libelle", columnDefinition = "VARCHAR(50)", nullable = false)
	@JsonView(Views.Common.class)
	protected String libelle;
	
	@Column(name = "prix", columnDefinition = "DECIMAL(5,2)", nullable = false)
	@JsonView(Views.Common.class)
	protected double prix;
	
	@Column(name = "stock")
	@JsonView(Views.Common.class)
	protected int stock;

	/*
	@OneToMany(mappedBy = "article")
	@JsonView(Views.ArticleWithSuivis.class)
	protected List<Suivi> suivis = new ArrayList<>();

	@OneToMany(mappedBy = "article")
	@JsonView(Views.ArticleWithReviews.class)
	protected List<Review> reviews = new ArrayList<>();

	@OneToMany(mappedBy = "article")
	@JsonView(Views.ArticleWithAchats.class)
	protected List<Achat> achats = new ArrayList<>();

	@OneToMany(mappedBy = "article")
	@JsonView(Views.ArticleWithPaniers.class)
	protected List<Panier> paniers = new ArrayList<>();
	*/

	public Article() {}

    public Article(String libelle, double prix, int stock) {
        this.libelle = libelle;
        this.prix = prix;
        this.stock = stock;
    }

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public double getPrix() {
		return prix;
	}

	public void setPrix(double prix) {
		this.prix = prix;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

}
