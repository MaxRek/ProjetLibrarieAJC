package g1.librairie_back.dto.request;

import g1.librairie_back.model.Livre;

public class CreateAuteurRequest {

    private String prenom;
    private String nom;

    public CreateAuteurRequest() {}

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
    
}
