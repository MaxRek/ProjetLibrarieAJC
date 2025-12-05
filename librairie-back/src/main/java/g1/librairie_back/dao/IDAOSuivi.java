package g1.librairie_back.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import g1.librairie_back.model.Suivi;
@Repository

public interface IDAOSuivi extends JpaRepository<Suivi,Integer>{
	
    @Query(value = "SELECT * FROM suivi s WHERE s.client = :clientId", nativeQuery = true)
    List<Suivi> findByClient(@Param("clientId") Integer clientId);

}
