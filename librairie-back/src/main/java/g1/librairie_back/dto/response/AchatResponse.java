package g1.librairie_back.dto.response;

import java.time.LocalDate;

import g1.librairie_back.model.Achat;

public class AchatResponse {

    private Integer id;
    private LocalDate dateAchat;
    private double prix;
    private int quantiteAchat;
    private Integer articleId;
    private Integer clientId;
    
    

    public Integer getId() {
		return id;
	}



	public void setId(Integer id) {
		this.id = id;
	}



	public LocalDate getDateAchat() {
		return dateAchat;
	}



	public void setDateAchat(LocalDate dateAchat) {
		this.dateAchat = dateAchat;
	}



	public double getPrix() {
		return prix;
	}



	public void setPrix(double prix) {
		this.prix = prix;
	}



	public int getQuantiteAchat() {
		return quantiteAchat;
	}



	public void setQuantiteAchat(int quantiteAchat) {
		this.quantiteAchat = quantiteAchat;
	}



	public Integer getArticleId() {
		return articleId;
	}



	public void setArticleId(Integer articleId) {
		this.articleId = articleId;
	}



	public Integer getClientId() {
		return clientId;
	}



	public void setClientId(Integer clientId) {
		this.clientId = clientId;
	}



	public static AchatResponse convert(Achat achat) {
        AchatResponse resp = new AchatResponse();

        resp.setId(achat.getId());
        resp.setDateAchat(achat.getDateAchat());
        resp.setPrix(achat.getPrix());
        resp.setQuantiteAchat(achat.getQuantiteAchat());

        if (achat.getArticle() != null) {
            resp.setArticleId(achat.getArticle().getId());
        }
        if (achat.getClient() != null) {
            resp.setClientId(achat.getClient().getId());
        }

        return resp;
    }
}
