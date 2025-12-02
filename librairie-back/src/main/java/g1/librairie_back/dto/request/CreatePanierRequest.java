package g1.librairie_back.dto.request;

public class CreatePanierRequest {
	
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

	public void setClientId(Integer client) {
		this.clientId = client;
	}

	public Integer getArticleId() {
		return articleId;
	}

	public void setArticleId(Integer articleId) {
		this.articleId = articleId;
	}
	
}
