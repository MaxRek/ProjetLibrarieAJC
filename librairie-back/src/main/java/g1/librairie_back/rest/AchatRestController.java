package g1.librairie_back.rest;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import g1.librairie_back.dto.request.CreateAchatRequest;
import g1.librairie_back.dto.response.AchatResponse;
import g1.librairie_back.model.Achat;
import g1.librairie_back.model.Article;
import g1.librairie_back.model.Client;
import g1.librairie_back.service.AchatService;
import g1.librairie_back.service.ArticleService;
import g1.librairie_back.service.CompteService;
import g1.librairie_back.view.Views;

@RestController
@RequestMapping("/api/achat")
@CrossOrigin("*")
public class AchatRestController {
    
	@Autowired
	AchatService achatSrv;
	
    @Autowired
	ArticleService articleSrv;
	
	@Autowired
	CompteService compteSrv;

    @GetMapping
    @JsonView(Views.Achat.class)
    public List<Achat> getAll() {
       
        List<Achat> achats = achatSrv.getAll();
        return achats;
    }

    @GetMapping("/{id}")
    @JsonView(Views.Achat.class)
    public AchatResponse getById(@PathVariable Integer id) {
        Achat achat = achatSrv.getById(id);
        return AchatResponse.convert(achat);
    }

    @PostMapping
    @JsonView(Views.Achat.class)
    public AchatResponse create(@RequestBody CreateAchatRequest request) {

    	Article article = articleSrv.getById(request.getArticleId());
	    if(article == null) {
	        throw new RuntimeException("Article introuvable");
	    }
	    Client client = compteSrv.getClientById(request.getClientId());
	    if(client == null) {
	        throw new RuntimeException("Client introuvable");
	    }
    	
	    Achat achat = new Achat();
		BeanUtils.copyProperties(request, achat);
		achat.setArticle(article);
		achat.setClient(client);
		
		achatSrv.create(achat);
        return AchatResponse.convert(achat);
    }
    
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        achatSrv.deleteById(id);
    }
    
    @PostMapping("/acheter/{id}")
    public void acheter(@PathVariable Integer id) {
        achatSrv.achatPanier(id);
    }
    
}
