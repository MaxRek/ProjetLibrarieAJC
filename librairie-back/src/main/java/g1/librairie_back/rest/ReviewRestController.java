package g1.librairie_back.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import g1.librairie_back.dto.request.CreateReviewRequest;
import g1.librairie_back.model.Article;
import g1.librairie_back.model.Client;
import g1.librairie_back.model.Review;
import g1.librairie_back.service.ArticleService;
import g1.librairie_back.service.CompteService;
import g1.librairie_back.service.ReviewService;
import g1.librairie_back.view.Views;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/review")
@CrossOrigin("*")
public class ReviewRestController {
	private static final Logger log = LoggerFactory.getLogger(ReviewRestController.class);

	@Autowired
	ReviewService reviewSrv;
	
	@Autowired
	ArticleService articleSrv;
	
	@Autowired
	CompteService compteSrv;

	@JsonView(Views.Review.class)
	@GetMapping
	public List<Review> allReviews() {
		log.info("GET /api/Review - allReviews() called");

		List<Review> reviews = reviewSrv.getAll();

		log.info("GET /api/Review - allReviews() returned {} reviews", reviews != null ? reviews.size() : 0);

		return reviews;
	}

	@JsonView(Views.Review.class)
	@GetMapping("/{id}")
	public ResponseEntity<Review> ficheReview(@PathVariable Integer id, Review Review) {
		log.info("GET /api/Review/{} - ficheReview() called", id);
		Review r = reviewSrv.getById(id);

		if (r == null) {
			log.info("GET /api/Review/{} - ficheReview() - review not found", id);
			return ResponseEntity.notFound().build();
		}

		log.info("GET /api/Review/{} - ficheReview() - review found", id);
		return ResponseEntity.ok(r);
	}

	@PostMapping
	public Integer ajoutReview(@Valid @RequestBody CreateReviewRequest request) {
		log.info("POST /api/Review - ajoutReview() called with request: {}", request);

		Article article = articleSrv.getById(request.getArticleId());
	    if(article == null) {
	        throw new RuntimeException("Article introuvable");
	    }
	    Client client = compteSrv.getClientById(request.getClientId());
	    if(client == null) {
	        throw new RuntimeException("Client introuvable");
	    }

	    Review review = new Review();
		BeanUtils.copyProperties(request, review);
	    review.setClient(client);
	    review.setArticle(article);
	    reviewSrv.create(review);

	    log.info("POST /api/Review - ajoutReview() created review with id: {}", review.getId());
	    return review.getId();
	}

	@JsonView(Views.Review.class)
	@GetMapping("/client/{idClient}")
	public List<Review> getReviewsByClient(@PathVariable Integer idClient) {

		List<Review> reviews = reviewSrv.getByClient(idClient);

		return reviews;
	}


	@JsonView(Views.Review.class)
	@DeleteMapping("/{id}")
	public void supprimerReview(@PathVariable Integer id) {
		log.info("DELETE /api/Review/{} - supprimerReview() called", id);
		reviewSrv.deleteById(id);
		log.info("DELETE /api/Review/{} - supprimerReview() completed", id);
	}
}
