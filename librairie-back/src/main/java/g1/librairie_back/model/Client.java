package g1.librairie_back.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("Client")
public class Client extends Compte{



	
	
	public Client() {}

	public Client(String nom, String prenom, String email, String password) {
		super(nom, prenom, email, password);
	}

	
}
