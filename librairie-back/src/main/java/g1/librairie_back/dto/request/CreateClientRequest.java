package g1.librairie_back.dto.request;

import jakarta.validation.constraints.NotBlank;

public class CreateClientRequest {
	
	protected String nom;
	protected String prenom;
	@NotBlank
	protected String email;
	@NotBlank
	protected String password;
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
}
