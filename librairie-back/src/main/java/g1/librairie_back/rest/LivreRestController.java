package g1.librairie_back.rest;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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
import g1.librairie_back.service.AuteurService;
import g1.librairie_back.service.LivreService;
import g1.librairie_back.view.Views;

@RestController
@RequestMapping("/api/livre")
@CrossOrigin(origins = "*")
public class LivreRestController {

    @Autowired
    private LivreService livreService;

    @Autowired
    private AuteurService auteurService;

    @GetMapping
    @JsonView(Views.Common.class)
    public List<LivreResponse> findAll() {
        return livreService.getAll()
                .stream()
                .map(LivreResponse::convert)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @JsonView(Views.Livre.class)
    public LivreResponse findById(@PathVariable Integer id) {
        Livre livre = livreService.getById(id);
        return LivreResponse.convert(livre);
    }

    @PostMapping
    @JsonView(Views.Livre.class)
    public LivreResponse create(@RequestBody CreateLivreRequest dto) {

        Auteur auteur = auteurService.getById(dto.getAuteurId());
        if (auteur == null) {
            throw new RuntimeException("Auteur introuvable");
        }

        Livre livre = new Livre(
                dto.getLibelle(),
                dto.getPrix(),
                dto.getStock(),
                dto.getAnnee(),
                auteur,
                dto.getGenre()
        );

        Livre saved = livreService.create(livre);
        return LivreResponse.convert(saved);
    }

    @PutMapping("/{id}")
    @JsonView(Views.Livre.class)
    public LivreResponse update(@PathVariable Integer id, @RequestBody CreateLivreRequest dto) {

        Livre livre = livreService.getById(id);
        if (livre == null) { throw new RuntimeException("Livre introuvable"); }

        Auteur auteur = auteurService.getById(dto.getAuteurId());
        if (auteur == null) { throw new RuntimeException("Auteur introuvable"); }

        livre.setLibelle(dto.getLibelle());
        livre.setPrix(dto.getPrix());
        livre.setStock(dto.getStock());
        livre.setAnnee(dto.getAnnee());
        livre.setAuteur(auteur);
        livre.setGenre(dto.getGenre());

        Livre updated = livreService.update(livre);
        return LivreResponse.convert(updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        livreService.deleteById(id);
    }
}
