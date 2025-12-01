package g1.librairie_back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import g1.librairie_back.dao.IDAOReview;
import g1.librairie_back.model.Review;


@Service
public class ReviewService {

	@Autowired
	IDAOReview daoReview;
	
	public List<Review> getAll()
	{
		return daoReview.findAll();
	}
	
	public Review getById(Integer id)
	{
		Optional<Review> opt = daoReview.findById(id);
		if(opt.isEmpty()) {return null;}
		else {return opt.get();}
	}

	public Review create(Review review)
	{
		if(review.getId()!=null)
		{
			throw new RuntimeException("Création impossible - id déjà existant");
		}
		return daoReview.save(review);
	}

	public void deleteById(Integer id)
	{
		daoReview.deleteById(id);
	}	
}
