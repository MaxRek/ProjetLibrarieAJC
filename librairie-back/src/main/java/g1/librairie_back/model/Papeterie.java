package g1.librairie_back.model;

import com.fasterxml.jackson.annotation.JsonView;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("Papeterie")
public class Papeterie extends Article {

	@Column(name = "type", columnDefinition = "VARCHAR(50)", nullable = false)
	@JsonView(Views.Common.class)
	private String type;

	@Column(name = "marque", columnDefinition = "VARCHAR(50)", nullable = false)
	@JsonView(Views.Common.class)
	private String marque;

	public Papeterie() {}

    public Papeterie(String libelle, double prix, int stock, String marque, String type) {
		super(libelle, prix, stock);
        this.marque = marque;
        this.type = type;
    }

	public String getType() {
		return type;
	}

	public String getMarque() {
		return marque;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setMarque(String marque) {
		this.marque = marque;
	}

}
