package g1.librairie_back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import g1.librairie_back.dao.IDAOReview;
import g1.librairie_back.model.Review;


@Service
public class ReviewService {

    @Autowired
    IDAOReview daoReview;
    
    public List<Review> getAll() {
        return daoReview.findAll();
    }
    
    public Review getById(Integer id) {
        Optional<Review> opt = daoReview.findById(id);
        return opt.orElse(null);
    }

    public Review create(Review review) {
        if (review.getId() != null) {
            throw new RuntimeException("Création impossible - id déjà existant");
        }
        return daoReview.save(review);
    }

 	public List<Review> getByClient(Integer clientId) {
        List<Review> all = daoReview.findAll();

        System.out.println("DEBUG getByClient(" + clientId + ")");
        all.forEach(r -> System.out.println(
            "  review id=" + r.getId() +
            " client=" + (r.getClient() != null ? r.getClient().getId() : null) +
            " note=" + r.getNote() +
            " texte=" + r.getReview()
        ));

        return all.stream()
            .filter(r -> r.getClient() != null && clientId.equals(r.getClient().getId()))
            .toList();
    }

    public void deleteById(Integer id) {
        daoReview.deleteById(id);
    }   
}

