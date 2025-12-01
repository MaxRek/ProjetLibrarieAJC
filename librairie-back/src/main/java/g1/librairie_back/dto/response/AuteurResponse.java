package g1.librairie_back.dto.response;

import g1.librairie_back.model.Auteur;

public class AuteurResponse {

    private Integer id;
    private String prenom;
    private String nom;

    public AuteurResponse() {}

    public AuteurResponse(Integer id, String prenom, String nom) {
        this.id = id;
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

    public static AuteurResponse convert(Auteur auteur) {
        AuteurResponse resp = new AuteurResponse();

        resp.setId(auteur.getId());
        resp.setPrenom(auteur.getPrenom());
        resp.setNom(auteur.getNom());

        return resp;
    }
}
