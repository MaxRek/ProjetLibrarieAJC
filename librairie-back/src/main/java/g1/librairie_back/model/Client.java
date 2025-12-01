package g1.librairie_back.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;

import g1.librairie_back.view.Views;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
@DiscriminatorValue("Client")
public class Client extends Compte{

	/*
	@JsonView(Views.Client.class)
	@OneToOne(mappedBy="client")
	protected Panier panier;
	
	@JsonView(Views.ClientWithSuivi.class)
	@OneToMany(mappedBy = "client")
	protected List<Suivi> suivi = new ArrayList();
	
	@JsonView(Views.ClientWithReview.class)
	@OneToMany(mappedBy = "client")
	protected List<Review> review = new ArrayList();
	
	@JsonView(Views.ClientWithAchat.class)
	@OneToMany(mappedBy = "client")
	protected List<Achat> achat = new ArrayList();
	*/
	
	public Client() {}
	
	public Client(String nom, String prenom, String email, String password) {
		super(nom, prenom, email, password);
	}




	public Panier getPanier() {
		return panier;
	}




	public void setPanier(Panier panier) {
		this.panier = panier;
	}




	public List<Suivi> getSuivi() {
		return suivi;
	}




	public void setSuivi(List<Suivi> suivi) {
		this.suivi = suivi;
	}




	public List<Review> getReview() {
		return review;
	}




	public void setReview(List<Review> review) {
		this.review = review;
	}




	public List<Achat> getAchat() {
		return achat;
	}




	public void setAchat(List<Achat> achat) {
		this.achat = achat;
	}




	@Override
	public String toString() {
		return "Client [panier=" + panier + ", suivi=" + suivi + ", review=" + review + ", achat=" + achat + "]";
	}




	

	
}
