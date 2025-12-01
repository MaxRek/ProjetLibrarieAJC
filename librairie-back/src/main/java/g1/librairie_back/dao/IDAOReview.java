package g1.librairie_back.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import g1.librairie_back.model.Review;

@Repository
public interface IDAOReview extends JpaRepository<Review,Integer>{
		
}
