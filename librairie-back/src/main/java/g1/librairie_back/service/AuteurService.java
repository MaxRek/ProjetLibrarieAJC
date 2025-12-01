package g1.librairie_back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import g1.librairie_back.dao.IDAOAuteur;
import g1.librairie_back.model.Auteur;

@Service
public class AuteurService {

    @Autowired
    private IDAOAuteur daoAuteur;

    public Auteur getById(Integer id) {
        Optional<Auteur> opt = daoAuteur.findById(id);
        if (opt.isEmpty()) {
            return null;
        } else {
            return opt.get();
        }
    }

    public List<Auteur> getAll() {
        return daoAuteur.findAll();
    }

    public Auteur create(Auteur auteur) {
        if (auteur.getId() != null) {
            throw new RuntimeException("Création impossible - id déjà existant");
        }
        return daoAuteur.save(auteur);
    }

    public Auteur update(Auteur auteur) {
        if (auteur.getId() == null) {
            throw new RuntimeException("Auteur sans id - modification impossible");
        }
        return daoAuteur.save(auteur);
    }

    public void deleteById(Integer id) {
        daoAuteur.deleteById(id);
    }

    public void delete(Auteur auteur) {
        daoAuteur.delete(auteur);
    }
}
