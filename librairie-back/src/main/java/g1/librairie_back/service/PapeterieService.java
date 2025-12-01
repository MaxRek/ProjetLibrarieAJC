package g1.librairie_back.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import g1.librairie_back.dao.IDAOArticle;
import g1.librairie_back.model.Article;
import g1.librairie_back.model.Papeterie;

public class PapeterieService {

    @Autowired
    private IDAOArticle daoArticle;

    public Papeterie getById(Integer id) {
        Optional<Article> opt = daoArticle.findById(id);
        if (opt.isEmpty()) {
            return null;
        } else {
            Article article = opt.get();
            if (article instanceof Papeterie) {
                return (Papeterie) article;
            } else {
                throw new RuntimeException("L'id ne correspond pas");
            }
        }
    }

    public List<Papeterie> getAll() {
        return daoArticle.findAll().stream()
                .filter(a -> a instanceof Papeterie)
                .map(a -> (Papeterie) a)
                .collect(Collectors.toList());
    }

    public Papeterie create(Papeterie papeterie) {
        if (papeterie.getId() != null) {
            throw new RuntimeException("Création impossible - id déjà existant");
        }
        Article saved = daoArticle.save(papeterie);
        return (Papeterie) saved;
    }

    public Papeterie update(Papeterie papeterie) {
        if (papeterie.getId() == null) {
            throw new RuntimeException("Papeterie sans id - modification impossible");
        }
        if (!(daoArticle.findById(papeterie.getId())
                .orElseThrow(() -> new RuntimeException("Papeterie inexistante")) instanceof Papeterie)) {
            throw new RuntimeException("L'id ne correspond pas");
        }
        Article saved = daoArticle.save(papeterie);
        return (Papeterie) saved;
    }

    public void deleteById(Integer id) {
        daoArticle.deleteById(id);
    }

    public void delete(Papeterie papeterie) {
        daoArticle.delete(papeterie);
    }
}
