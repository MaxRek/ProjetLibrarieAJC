package g1.librairie_back.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import g1.librairie_back.model.Panier;
@Repository

public interface IDAOPanier extends JpaRepository<Panier,Integer>{
		
	List<Panier> findByClientId(Integer clientId);	
	public void deleteByClientId(Integer id);
	
}
