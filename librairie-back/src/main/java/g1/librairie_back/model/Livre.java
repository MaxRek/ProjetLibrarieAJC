package g1.librairie_back.model;

import com.fasterxml.jackson.annotation.JsonView;

import g1.librairie_back.view.Views;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@DiscriminatorValue("Livre")
public class Livre extends Article {

	@Column(name = "annee", columnDefinition = "int default 4")
	@JsonView(Views.Common.class)
	private int annee;

	@ManyToOne
	@JoinColumn(name = "auteur")
	@JsonView(Views.Livre.class)
	private Auteur auteur;

	@Enumerated(EnumType.STRING)
    @JsonView(Views.Common.class)
	private Genre genre;
	
	public Livre() {}

	public Livre(String libelle, double prix, int stock, int annee, Auteur auteur, Genre genre) {
		super(libelle, prix, stock);
		this.annee = annee;
		this.auteur = auteur;
		this.genre = genre;
	}

	public int getAnnee() {
		return annee;
	}

	public Auteur getAuteur() {
		return auteur;
	}

	public Genre getGenre() {
		return genre;
	}

	public void setAnnee(int annee) {
		this.annee = annee;
	}

	public void setAuteur(Auteur auteur) {
		this.auteur = auteur;
	}

	public void setGenre(Genre genre) {
		this.genre = genre;
	}
	
}
