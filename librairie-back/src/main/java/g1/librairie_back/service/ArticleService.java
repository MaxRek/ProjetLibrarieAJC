package g1.librairie_back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import g1.librairie_back.dao.IDAOArticle;
import g1.librairie_back.model.Article;

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

    public List<Article> getAll() {
        return daoArticle.findAll();
    }

    public Article create(Article article) {
        if (article.getId() != null) {
            throw new RuntimeException("Création impossible - id déjà existant");
        }
        return daoArticle.save(article);
    }

    public Article update(Article article) {
        if (article.getId() == null) {
            throw new RuntimeException("Article sans id - modification impossible");
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
