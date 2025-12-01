package g1.librairie_back.dto.response;

import g1.librairie_back.model.Auteur;
import g1.librairie_back.model.Genre;
import g1.librairie_back.model.Livre;

public class LivreResponse {

private Integer id;
    private String libelle;
    private double prix;
    private int stock;
    private int annee;
    private Genre genre;
    private AuteurResponse auteur;

    public LivreResponse() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public double getPrix() {
        return prix;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public int getAnnee() {
        return annee;
    }

    public void setAnnee(int annee) {
        this.annee = annee;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public AuteurResponse getAuteur() {
        return auteur;
    }

    public void setAuteur(AuteurResponse auteur) {
        this.auteur = auteur;
    }

    public static LivreResponse convert(Livre livre) {
        LivreResponse resp = new LivreResponse();

        resp.setId(livre.getId());
        resp.setLibelle(livre.getLibelle());
        resp.setPrix(livre.getPrix());
        resp.setStock(livre.getStock());
        resp.setAnnee(livre.getAnnee());
        resp.setGenre(livre.getGenre());

        Auteur auteur = livre.getAuteur();
        resp.setAuteur(AuteurResponse.convert(auteur));

        return resp;
    }
}