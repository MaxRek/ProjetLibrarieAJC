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


	
	
	public Client() {}

	public Client(String nom, String prenom, String email, String password) {
		super(nom, prenom, email, password);
	}

	
}
