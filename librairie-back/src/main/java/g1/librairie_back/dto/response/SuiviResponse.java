package g1.librairie_back.dto.response;

import g1.librairie_back.model.Article;
import g1.librairie_back.model.Client;
import g1.librairie_back.model.Suivi;

public class SuiviResponse {
	private Integer id;
	private Integer clientId;
	private Integer articleId;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public static SuiviResponse convert(Suivi suivi) {
		SuiviResponse resp = new SuiviResponse();
        
        resp.setId(suivi.getId());
        resp.setArticleId(suivi.getArticle().getId());
        resp.setClientId(suivi.getClient().getId());
        
        return resp;
    }
}
