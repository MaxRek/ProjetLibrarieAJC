package g1.librairie_back.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import g1.librairie_back.dao.IDAOArticle;
import g1.librairie_back.model.Article;
import g1.librairie_back.model.Livre;

@Service
public class LivreService {

    @Autowired
    private IDAOArticle daoArticle;

    public Livre getById(Integer id) {
        Optional<Article> opt = daoArticle.findById(id);
        if (opt.isEmpty()) {
            return null;
        } else {
            Article article = opt.get();
            if (article instanceof Livre) {
                return (Livre) article;
            } else {
                throw new RuntimeException("L'id ne correspond pas");
            }
        }
    }

    public List<Livre> getAll() {
        return daoArticle.findAll().stream()
                .filter(a -> a instanceof Livre)
                .map(a -> (Livre) a)
                .collect(Collectors.toList());
    }

    public Livre create(Livre livre) {
        if (livre.getId() != null) {
            throw new RuntimeException("Création impossible - id déjà existant");
        }
        Article saved = daoArticle.save(livre);
        return (Livre) saved;
    }

    public Livre update(Livre livre) {
        if (livre.getId() == null) {
            throw new RuntimeException("Livre sans id - modification impossible");
        }
        if (!(daoArticle.findById(livre.getId())
                .orElseThrow(() -> new RuntimeException("Livre inexistant")) instanceof Livre)) {
            throw new RuntimeException("L'id ne correspond pas");
        }
        Article saved = daoArticle.save(livre);
        return (Livre) saved;
    }

    public void deleteById(Integer id) {
        daoArticle.deleteById(id);
    }

    public void delete(Livre livre) {
        daoArticle.delete(livre);
    }
}
