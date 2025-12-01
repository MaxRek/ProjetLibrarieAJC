package g1.librairie_back.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import g1.librairie_back.model.Admin;
import g1.librairie_back.model.Client;
import g1.librairie_back.model.Compte;
@Repository

public interface IDAOCompte extends JpaRepository<Compte,Integer>{
	@Query("from Client")
	public List<Client> findAllClient();
	
	@Query("from Admin")
	public List<Admin> findAllAdmin();
	
}
