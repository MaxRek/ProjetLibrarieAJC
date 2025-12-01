package g1.librairie_back.dto.request;

import g1.librairie_back.model.Article;
import g1.librairie_back.model.Client;

public class CreatePanierRequest {
	
	private Integer id;
	
	private int quantite;
	
	private Client client;
	
	private Article article;

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

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public Article getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article = article;
	}
	
	
	
}
