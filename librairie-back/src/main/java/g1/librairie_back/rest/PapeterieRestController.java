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

import g1.librairie_back.dto.request.CreatePapeterieRequest;
import g1.librairie_back.dto.response.PapeterieResponse;
import g1.librairie_back.model.Papeterie;
import g1.librairie_back.service.PapeterieService;
import g1.librairie_back.view.Views;

@RestController
@RequestMapping("/api/papeterie")
@CrossOrigin("*")
public class PapeterieRestController {

    @Autowired
    private PapeterieService papService;

    @GetMapping
    @JsonView(Views.Common.class)
    public List<PapeterieResponse> getAll() {
        return papService.getAll().stream()
                .map(PapeterieResponse::convert)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @JsonView(Views.Common.class)
    public PapeterieResponse getById(@PathVariable Integer id) {
        Papeterie pap = papService.getById(id);
        return PapeterieResponse.convert(pap);
    }

    @PostMapping
    @JsonView(Views.Common.class)
    public PapeterieResponse create(@RequestBody CreatePapeterieRequest dto) {
        Papeterie pap = new Papeterie(
                dto.getLibelle(),
                dto.getPrix(),
                dto.getStock(),
                dto.getMarque(),
                dto.getType()
        );
        return PapeterieResponse.convert(papService.create(pap));
    }

    @PutMapping("/{id}")
    @JsonView(Views.Common.class)
    public PapeterieResponse update(@PathVariable Integer id, @RequestBody CreatePapeterieRequest dto) {

        Papeterie pap = papService.getById(id);
        if (pap == null) throw new RuntimeException("Papeterie introuvable");

        pap.setLibelle(dto.getLibelle());
        pap.setPrix(dto.getPrix());
        pap.setStock(dto.getStock());
        pap.setMarque(dto.getMarque());
        pap.setType(dto.getType());

        return PapeterieResponse.convert(papService.update(pap));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        papService.deleteById(id);
    }
}
