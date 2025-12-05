package g1.librairie_back.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import g1.librairie_back.model.Review;

@Repository
public interface IDAOReview extends JpaRepository<Review,Integer>{

    @Query(value = "SELECT * FROM review r WHERE r.client = :clientId", nativeQuery = true)
    List<Review> findByClient(@Param("clientId") Integer clientId);
}
