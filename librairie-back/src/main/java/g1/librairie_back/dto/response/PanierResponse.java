package g1.librairie_back.dto.response;

import g1.librairie_back.model.Panier;

public class PanierResponse {
private Integer id;
	
	private int quantite;
	
	private Integer clientId;
	
	private Integer articleId;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getQuantite() {
		return quantite;
	}

	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}

	public Integer getClientId() {
		return clientId;
	}

	public void setClientId(Integer clientId) {
		this.clientId = clientId;
	}

	public Integer getArticleId() {
		return articleId;
	}

	public void setArticleId(Integer articleId) {
		this.articleId = articleId;
	}

	public static PanierResponse convert(Panier panier) {
		PanierResponse resp = new PanierResponse();
        
        resp.setId(panier.getId());
        resp.setArticleId(panier.getArticle().getId());
        resp.setClientId(panier.getClient().getId());
        resp.setQuantite(panier.getQuantite());
        
        return resp;
    }
}
