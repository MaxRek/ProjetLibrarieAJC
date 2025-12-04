package g1.librairie_back.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import g1.librairie_back.model.Panier;
@Repository

public interface IDAOPanier extends JpaRepository<Panier,Integer>{
	
	@Query(value = "SELECT * FROM panier p WHERE p.client = :clientId", nativeQuery = true)
    List<Panier> findByClient(@Param("clientId") Integer clientId);

	public void deleteByClientId(Integer id);
	
}
