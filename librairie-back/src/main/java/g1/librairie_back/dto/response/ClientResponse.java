package g1.librairie_back.dto.response;

import g1.librairie_back.model.Client;

public class ClientResponse {
	private int id;
	private String nom;
	private String prenom;
	private String email;
	private String password;
	
	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public static ClientResponse convert(Client client) {
		ClientResponse resp = new ClientResponse();
        
        resp.setId(client.getId());
        resp.setNom(client.getNom());
        resp.setPrenom(client.getPrenom());
        resp.setEmail(client.getEmail());
        resp.setPassword(client.getPassword());
        
        return resp;
    }
}
