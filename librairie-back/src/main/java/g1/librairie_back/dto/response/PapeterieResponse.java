package g1.librairie_back.dto.response;

import g1.librairie_back.model.Papeterie;

public class PapeterieResponse {

    private int id;
    private String libelle;
    private double prix;
    private int stock;
    private String marque;
    private String type;

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public String getMarque() {
        return marque;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public static PapeterieResponse convert(Papeterie pap) {
        PapeterieResponse resp = new PapeterieResponse();

        resp.setId(pap.getId());
        resp.setLibelle(pap.getLibelle());
        resp.setPrix(pap.getPrix());
        resp.setStock(pap.getStock());
        resp.setMarque(pap.getMarque());
        resp.setType(pap.getType());

        return resp;
    }
}
