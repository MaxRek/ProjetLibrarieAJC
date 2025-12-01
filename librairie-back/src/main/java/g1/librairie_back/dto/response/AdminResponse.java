package g1.librairie_back.dto.response;

import g1.librairie_back.model.Admin;

public class AdminResponse {
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

	public static AdminResponse convert(Admin admin) {
		AdminResponse resp = new AdminResponse();
        
        resp.setId(admin.getId());
        resp.setNom(admin.getNom());
        resp.setPrenom(admin.getPrenom());
        resp.setEmail(admin.getEmail());
        resp.setPassword(admin.getPassword());
        
        return resp;
    }
}
