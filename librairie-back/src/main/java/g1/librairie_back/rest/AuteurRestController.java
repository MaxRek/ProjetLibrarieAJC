package g1.librairie_back.rest;

import java.util.ArrayList;
import java.util.List;

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

import g1.librairie_back.dto.request.CreateAuteurRequest;
import g1.librairie_back.dto.response.AuteurResponse;
import g1.librairie_back.model.Auteur;
import g1.librairie_back.model.Livre;
import g1.librairie_back.service.AuteurService;
import g1.librairie_back.view.Views;

@RestController
@RequestMapping("/api/auteur")
@CrossOrigin("*")
public class AuteurRestController {

    @Autowired
    private AuteurService auteurService;

    @GetMapping
    @JsonView(Views.Auteur.class)
    public List<Auteur> getAll() {
       
		List<Auteur> auteurs = auteurService.getAll();
		return auteurs;

    }

    @GetMapping("/{id}")
    @JsonView(Views.Auteur.class)
    public AuteurResponse getById(@PathVariable Integer id) {
        Auteur a = auteurService.getById(id);
        return AuteurResponse.convert(a);
    }

    @PostMapping
    @JsonView(Views.Auteur.class)
    public AuteurResponse create(@RequestBody CreateAuteurRequest dto) {
        Auteur a = new Auteur(dto.getPrenom(), dto.getNom());
        a.setLivres(new ArrayList<Livre>());
        return AuteurResponse.convert(auteurService.create(a));
    }

    @PutMapping("/{id}")
    @JsonView(Views.Auteur.class)
    public AuteurResponse update(@PathVariable Integer id, @RequestBody CreateAuteurRequest dto) {
        Auteur a = auteurService.getById(id);
        if (a == null) throw new RuntimeException("Auteur introuvable");

        a.setPrenom(dto.getPrenom());
        a.setNom(dto.getNom());

        return AuteurResponse.convert(auteurService.update(a));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        auteurService.deleteById(id);
    }
}
