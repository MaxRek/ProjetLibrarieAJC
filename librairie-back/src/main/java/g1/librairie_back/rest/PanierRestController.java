package g1.librairie_back.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import g1.librairie_back.dto.request.CreatePanierRequest;
import g1.librairie_back.dto.response.PanierResponse;
import g1.librairie_back.model.Panier;
import g1.librairie_back.service.PanierService;
import g1.librairie_back.view.Views;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/panier")
public class PanierRestController {
	private static final Logger log = LoggerFactory.getLogger(PanierRestController.class);

	@Autowired
	PanierService panierSrv;

	@JsonView(Views.Panier.class)
	@GetMapping
	public List<Panier> allPaniers() {
		log.info("GET /api/Panier - allPaniers() called");
		List<Panier> Paniers = panierSrv.getAll();
		log.info("GET /api/Panier - allPaniers() returned {} Paniers", Paniers != null ? Paniers.size() : 0);
		return Paniers;
	}

	@JsonView(Views.Panier.class)
	@GetMapping("/{id}")
	public ResponseEntity<Panier> fichePanier(@PathVariable Integer id, Panier Panier) {
		log.info("GET /api/Panier/{} - fichePanier() called", id);
		Panier r = panierSrv.getById(id);

		if (r == null) {
			log.info("GET /api/Panier/{} - fichePanier() - Panier not found", id);
			return ResponseEntity.notFound().build();
		}

		log.info("GET /api/Panier/{} - fichePanier() - Panier found", id);
		return ResponseEntity.ok(r);
	}

	@PostMapping
	public Integer ajoutPanier(@Valid @RequestBody CreatePanierRequest request) {
		log.info("POST /api/Panier - ajoutPanier() called with request: {}", request);

		Panier panier = new Panier();
		BeanUtils.copyProperties(request, panier);

		panierSrv.create(panier);

		log.info("POST /api/Panier - ajoutPanier() created Panier with id: {}", panier.getId());

		return panier.getId();
	}

	
	@PutMapping("/{id}")
    @JsonView(Views.Common.class)
    public Panier update(@PathVariable Integer id, @RequestBody Panier panier) {
		log.info("PUT /api/Panier/{} - modifierPanier() called with panier: {}", id, panier);

		panier.setId(id);

		log.info("PUT /api/Panier/{} - modifierPanier() updating panier", id);

		return panierSrv.update(panier);
    }

	@JsonView(Views.Panier.class)
	@DeleteMapping("/{id}")
	public void supprimerPanier(@PathVariable Integer id) {
		log.info("DELETE /api/Panier/{} - supprimerPanier() called", id);
		panierSrv.deleteById(id);
		log.info("DELETE /api/Panier/{} - supprimerPanier() completed", id);
	}
}
