package g1.librairie_back.model;

import com.fasterxml.jackson.annotation.JsonView;

import g1.librairie_back.view.Views;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="suivi")
public class Suivi {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@JsonView(Views.Common.class)
	private Integer id;
	
	@ManyToOne
	@JsonView(Views.Suivi.class)

	@JoinColumn(name="client",nullable = false)
	private Client client;
	
	@ManyToOne
	@JsonView(Views.Suivi.class)

	@JoinColumn(name="article",nullable = false)
	private Article article;
	
	public Suivi() {}

	public Suivi(Integer id, Client client, Article article) {
		super();
		this.id = id;
		this.client = client;
		this.article = article;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	@Override
	public String toString() {
		return "Suivi [id=" + id + ", client=" + client + ", article=" + article + "]";
	}

	
	
}
