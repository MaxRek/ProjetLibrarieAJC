package g1.librairie_back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import g1.librairie_back.dao.IDAOArticle;
import g1.librairie_back.model.Article;
import g1.librairie_back.model.Livre;
import g1.librairie_back.model.Papeterie;

@Service
public class ArticleService {

    @Autowired
    private IDAOArticle daoArticle;

    public Article getById(Integer id) {
        Optional<Article> opt = daoArticle.findById(id);
        if (opt.isEmpty()) {
            return null;
        } else {
            return opt.get();
        }
    }

    public Livre getLivreById(Integer id) {
        Optional<Article> opt = daoArticle.findById(id);
        if (opt.isEmpty()) {
            return null;
        } else {
            Article article = opt.get();
            if (article instanceof Livre) {
                return (Livre) article;
            } else {
                throw new RuntimeException("L'id reçu ne correspond pas");
            }
        }
    }

    public Papeterie getPapeterieById(Integer id) {
        Optional<Article> opt = daoArticle.findById(id);
        if (opt.isEmpty()) {
            return null;
        } else {
            Article article = opt.get();
            if (article instanceof Papeterie) {
                return (Papeterie) article;
            } else {
                throw new RuntimeException("L'id reçu ne correspond pas");
            }
        }
    }

    public List<Article> getAll() {
        return daoArticle.findAll();
    }

    public List<Livre> getAllLivres() {
        return daoArticle.findAllLivres();
    }

    public List<Papeterie> getAllPapeteries() {
        return daoArticle.findAllPapeteries();
    }

    public Article create(Article article) {
        if (article.getId() != null) {
            throw new RuntimeException("id déjà existant");
        }
        return daoArticle.save(article);
    }

    public Article update(Article article) {
        if (article.getId() == null) {
            throw new RuntimeException("modification impossible");
        }
        return daoArticle.save(article);
    }

    public void deleteById(Integer id) {
        daoArticle.deleteById(id);
    }

    public void delete(Article article) {
        daoArticle.delete(article);
    }


}
