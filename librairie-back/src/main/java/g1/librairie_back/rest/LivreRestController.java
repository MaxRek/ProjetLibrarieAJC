package g1.librairie_back.rest;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

import g1.librairie_back.dto.request.CreateLivreRequest;
import g1.librairie_back.dto.response.LivreResponse;
import g1.librairie_back.model.Auteur;
import g1.librairie_back.model.Livre;
import g1.librairie_back.service.ArticleService;
import g1.librairie_back.service.AuteurService;
import g1.librairie_back.view.Views;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/livre")
@CrossOrigin(origins = "*")
public class LivreRestController {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private AuteurService auteurService;

    @GetMapping
    @JsonView(Views.Livre.class)
    public List<Livre> findAll() {
        List<Livre> livres = articleService.getAllLivres();
        return livres;
    }

    @GetMapping("/{id}")
    @JsonView(Views.Livre.class)
    public Livre getById(@PathVariable Integer id) {
        Livre livre =  (Livre) articleService.getById(id);

       return livre;
    }

    @PostMapping
    public ResponseEntity<Integer> create(@Valid @RequestBody CreateLivreRequest request) {

        Auteur auteur = auteurService.getById(request.getAuteurId());
        if (auteur == null)
            return ResponseEntity.badRequest().build();

        Livre livre = new Livre();
        BeanUtils.copyProperties(request, livre);
        livre.setAuteur(auteur);

        Livre saved = (Livre) articleService.create(livre);

        return ResponseEntity.ok(saved.getId());
    }

    @JsonView(Views.Livre.class)
    @PutMapping("/{id}")
    public ResponseEntity<LivreResponse> update(@PathVariable Integer id,
                                                @RequestBody CreateLivreRequest request) {

        Livre livre = (Livre) articleService.getById(id);
        if (livre == null)
            return ResponseEntity.notFound().build();

        Auteur auteur = auteurService.getById(request.getAuteurId());
        if (auteur == null)
            return ResponseEntity.badRequest().build();

        BeanUtils.copyProperties(request, livre);
        livre.setAuteur(auteur);

        Livre updated = (Livre) articleService.update(livre);

        return ResponseEntity.ok(LivreResponse.convert(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {

        Livre livre = (Livre) articleService.getById(id);
        if (livre == null)
            return ResponseEntity.notFound().build();

        articleService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
