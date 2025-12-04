package g1.librairie_back.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import g1.librairie_back.dao.IDAOAchat;
import g1.librairie_back.dao.IDAOArticle;
import g1.librairie_back.dao.IDAOCompte;
import g1.librairie_back.model.Achat;
import g1.librairie_back.model.Article;
import g1.librairie_back.model.Client;
import g1.librairie_back.model.Compte;
import g1.librairie_back.model.Panier;
import jakarta.transaction.Transactional;

@Service
public class AchatService {

    @Autowired
    private IDAOAchat daoAchat;

    @Autowired
    private IDAOArticle daoArticle;

    @Autowired
    private IDAOCompte daoCompte;
    
    @Autowired
    private ArticleService articleService;
    
    @Autowired
    private PanierService panierService;

    public Achat getById(Integer id) {
        Optional<Achat> opt = daoAchat.findById(id);
        return opt.orElse(null);
    }

    public List<Achat> getAll() {
        return daoAchat.findAll();
    }

    public Achat create(Achat achat) {
        if (achat.getId() != null) {
            throw new RuntimeException("Création impossible - id déjà existant");
        }
        if (achat.getDateAchat() == null) {
            achat.setDateAchat(LocalDate.now());
        }
        return daoAchat.save(achat);
    }

    public Achat update(Achat achat) {
        if (achat.getId() == null) {
            throw new RuntimeException("Achat sans id - modification impossible");
        }
        return daoAchat.save(achat);
    }

    public void deleteById(Integer id) {
        daoAchat.deleteById(id);
    }

    public void delete(Achat achat) {
        daoAchat.delete(achat);
    }

    public Achat createFromIds(Integer articleId, Integer clientId, int qte, double prix, LocalDate date) {

        Article article = daoArticle.findById(articleId)
                .orElseThrow(() -> new RuntimeException("Article introuvable"));

        Compte compte = daoCompte.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Compte introuvable"));

        if (!(compte instanceof Client)) {
            throw new RuntimeException("L'id fourni n'est pas valide");
        }

        Client client = (Client) compte;

        Achat achat = new Achat(
                date != null ? date : LocalDate.now(),
                prix,
                qte,
                article,
                client
        );

        return daoAchat.save(achat);
    }
    
    @Transactional
    public String achatPanier(Integer clientId) {
    	List<Panier> panier = panierService.getByClient(clientId);

        for (Panier p : panier) {

            Achat achat = new Achat();
            
            int stock = p.getArticle().getStock() - p.getQuantite();
            if(stock>0) {
            p.getArticle().setStock(stock);
            articleService.update(p.getArticle());
            
            achat.setDateAchat(LocalDate.now());
            achat.setQuantiteAchat(p.getQuantite());
            achat.setPrix(p.getArticle().getPrix());
            achat.setArticle(p.getArticle());
            achat.setClient(p.getClient());
            
            p.getArticle().setStock(p.getArticle().getStock() - p.getQuantite());
            articleService.update(p.getArticle());
           
            daoAchat.save(achat);
            panierService.deleteById(p.getId());
            }
            else {
            	throw new RuntimeException(p.getArticle().getLibelle()+" n'est plus en stock, il en reste "+p.getArticle().getStock());
            }
        }
        return "ok";
    }
    
}
