package g1.librairie_back.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

//@Entity
//@DiscriminatorValue("Abonne")
public class Abonne {// extends Client{

	//@Column(name="reduction",columnDefinition="DECIMAL(4,2)")
	//private double reduc;
	
	//@Column(name="debut_abo", columnDefinition="VARCHAR(20)")
	//private LocalDate debut;
	
	//@Column(name="fin_abo",nullable=false)
	//private LocalDate fin;
	
	public Abonne() {}

	/*public Abonne(String nom, String prenom, String email, String password, double reduc, LocalDate debut,
			LocalDate fin) {
		//super(nom, prenom, email, password);
		this.reduc = reduc;
		this.debut = debut;
		this.fin = fin;
	}*/

	/*public double getReduc() {
		return reduc;
	}

	public void setReduc(double reduc) {
		this.reduc = reduc;
	}

	public LocalDate getDebut() {
		return debut;
	}

	public void setDebut(LocalDate debut) {
		this.debut = debut;
	}

	public LocalDate getFin() {
		return fin;
	}

	public void setFin(LocalDate fin) {
		this.fin = fin;
	}
	
	public String toString() {
		return "Abonne [reduc=" + reduc + ", debut=" + debut + ", fin=" + fin + "]";
	}*/
}
