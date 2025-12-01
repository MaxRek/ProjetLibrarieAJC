package g1.librairie_back.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import g1.librairie_back.model.Panier;

public interface IDAOPanier extends JpaRepository<Panier,Integer>{
		
}
