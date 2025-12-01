package g1.librairie_back.model;

import com.fasterxml.jackson.annotation.JsonView;

import g1.librairie_back.view.Views;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Panier {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@JsonView(Views.Common.class)
	private Integer id;
	
	@Column(name="quantite",nullable=false)
	private int quantite;
	
	@OneToOne
	@JoinColumn(name="client",nullable = false)
	private Client client;
	
	@OneToOne
	@JoinColumn(name="article",nullable = false)
	private Article article;
	

	public Panier() {}

	public Panier(int quantite) {
		super();
		this.quantite = quantite;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getQuantite() {
		return quantite;
	}

	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}

	@Override
	public String toString() {
		return "Panier [id=" + id + ", quantite=" + quantite + "]";
	}
	
}
