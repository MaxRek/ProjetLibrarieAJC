package g1.librairie_back.rest;

import java.util.List;

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

import g1.librairie_back.dto.request.CreatePapeterieRequest;
import g1.librairie_back.dto.response.PapeterieResponse;
import g1.librairie_back.model.Papeterie;
import g1.librairie_back.service.ArticleService;
import g1.librairie_back.view.Views;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/papeterie")
@CrossOrigin("*")
public class PapeterieRestController {

    @Autowired
    private ArticleService articleService;

    @JsonView(Views.Common.class)
    @GetMapping
    public List<PapeterieResponse> getAll() {
        return articleService.getAllPapeteries()
                .stream()
                .map(PapeterieResponse::convert)
                .toList();
    }

    @JsonView(Views.Common.class)
    @GetMapping("/{id}")
    public ResponseEntity<PapeterieResponse> getById(@PathVariable Integer id) {

        Papeterie papeterie = articleService.getPapeterieById(id);

        if (papeterie == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(PapeterieResponse.convert(papeterie));
    }

    @PostMapping
    public ResponseEntity<Integer> create(@Valid @RequestBody CreatePapeterieRequest request) {

        Papeterie papeterie = new Papeterie();
        BeanUtils.copyProperties(request, papeterie);

        Papeterie saved = (Papeterie) articleService.create(papeterie);

        return ResponseEntity.ok(saved.getId());
    }

    @JsonView(Views.Common.class)
    @PutMapping("/{id}")
    public ResponseEntity<PapeterieResponse> update(@PathVariable Integer id,
                                                    @RequestBody CreatePapeterieRequest request) {

        Papeterie papeterie = articleService.getPapeterieById(id);
        if (papeterie == null)
            return ResponseEntity.notFound().build();

        BeanUtils.copyProperties(request, papeterie);

        Papeterie updated = (Papeterie) articleService.update(papeterie);

        return ResponseEntity.ok(PapeterieResponse.convert(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {

        Papeterie papeterie = articleService.getPapeterieById(id);
        if (papeterie == null)
            return ResponseEntity.notFound().build();

        articleService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
