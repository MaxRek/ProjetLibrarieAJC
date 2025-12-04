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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import g1.librairie_back.dto.request.CreateSuiviRequest;
import g1.librairie_back.model.Article;
import g1.librairie_back.model.Client;
import g1.librairie_back.model.Suivi;
import g1.librairie_back.service.ArticleService;
import g1.librairie_back.service.CompteService;
import g1.librairie_back.service.SuiviService;
import g1.librairie_back.view.Views;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/suivi")
@CrossOrigin("*")

public class SuiviRestController {
	private static final Logger log = LoggerFactory.getLogger(SuiviRestController.class);

	@Autowired
	SuiviService suiviSrv;
	
	@Autowired
	ArticleService articleSrv;
	
	@Autowired
	CompteService compteSrv;

	@JsonView(Views.Suivi.class)
	@GetMapping
	public List<Suivi> allSuivis() {
		log.info("GET /api/suivi - allSuivis() called");

		List<Suivi> suivis = suiviSrv.getAll();

		log.info("GET /api/suivi - allSuivis() returned {} suivis", suivis != null ? suivis.size() : 0);

		return suivis;
	}

	@JsonView(Views.Suivi.class)
	@GetMapping("/{id}")
	public ResponseEntity<Suivi> ficheSuivi(@PathVariable Integer id, Suivi suivi) {
		log.info("GET /api/suivi/{} - ficheSuivi() called", id);
		Suivi s = suiviSrv.getById(id);

		if (s == null) {
			log.info("GET /api/suivi/{} - ficheSuivi() - suivi not found", id);
			return ResponseEntity.notFound().build();
		}

		log.info("GET /api/suivi/{} - ficheSuivi() - suivi found", id);
		return ResponseEntity.ok(s);
	}

	@PostMapping
	public Integer ajoutSuivi(@Valid @RequestBody CreateSuiviRequest request) {
		log.info("POST /api/suivi - ajoutSuivi() called with request: {}", request);
		Article article = articleSrv.getById(request.getArticleId());
	    if(article == null) {
	        throw new RuntimeException("Article introuvable");
	    }
	    Client client = compteSrv.getClientById(request.getClientId());
	    if(client == null) {
	        throw new RuntimeException("Client introuvable");
	    }
		Suivi suivi = new Suivi();
		BeanUtils.copyProperties(request, suivi);
		suivi.setArticle(article);
		suivi.setClient(client);
		suiviSrv.create(suivi);

		log.info("POST /api/Suivi - ajoutSuivi() created suivi with id: {}", suivi.getId());

		return suivi.getId();
	}

	@JsonView(Views.Suivi.class)
	@PutMapping("/{id}")
	public Suivi modifierSuivi(@PathVariable Integer id, @RequestBody Suivi suivi) {
		log.info("PUT /api/Suivi/{} - modifierSuivi() called with suivi: {}", id, suivi);

		suivi.setId(id);

		log.info("PUT /api/suivi/{} - modifierSuivi() updating suivi", id);

		return suiviSrv.update(suivi);
	}

	@JsonView(Views.Suivi.class)
	@DeleteMapping("/{id}")
	public void supprimerSuivi(@PathVariable Integer id) {
		log.info("DELETE /api/Suivi/{} - supprimerSuivi() called", id);
		suiviSrv.deleteById(id);
		log.info("DELETE /api/Suivi/{} - supprimerSuivi() completed", id);
	}
}
