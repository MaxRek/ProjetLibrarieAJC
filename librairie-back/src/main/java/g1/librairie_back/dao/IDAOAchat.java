package g1.librairie_back.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import g1.librairie_back.model.Achat;
@Repository
public interface IDAOAchat extends JpaRepository<Achat,Integer>{
	
    @Query(value = "SELECT * FROM achat a WHERE a.client = :clientId", nativeQuery = true)
    List<Achat> findByClient(@Param("clientId") Integer clientId);
}
