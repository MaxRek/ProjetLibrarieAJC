package g1.librairie_back.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;

import g1.librairie_back.view.Views;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Auteur {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(Views.Common.class)
    private Integer id;

	@Column(name = "prenom", columnDefinition = "VARCHAR(100)", nullable = false)
	@JsonView(Views.Common.class)
	private String prenom;

	@Column(name = "nom", columnDefinition = "VARCHAR(100)", nullable = false)
	@JsonView(Views.Common.class)
	private String nom;

	@OneToMany(mappedBy="auteur")
	@JsonView(Views.AuteurWithLivre.class)
	@Column(name="auteur", nullable=true)
	private List<Livre> livres = new ArrayList<>();
	
	public Auteur() {}

	public Auteur(String prenom, String nom) {
		this.prenom = prenom;
		this.nom = nom;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public List<Livre> getLivres() {
        return livres;
    }

    public void setLivres(List<Livre> livres) {
        this.livres = livres;
    }
	
}
