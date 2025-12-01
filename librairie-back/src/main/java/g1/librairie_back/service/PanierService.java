package g1.librairie_back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import g1.librairie_back.dao.IDAOPanier;
import g1.librairie_back.model.Panier;


@Service
public class PanierService {

	@Autowired
	IDAOPanier daoPanier;
	
	public List<Panier> getAll()
	{
		return daoPanier.findAll();
	}
	
	public Panier getById(Integer id) {
		Optional<Panier> opt = daoPanier.findById(id);
		if(opt.isEmpty()) {return null;}
		else {return opt.get();}
    }

    public Panier create(Panier panier) {
        if (panier.getId() != null) {
            throw new RuntimeException("Création impossible - id déjà existant");
        }
        Panier saved = daoPanier.save(panier);
        return saved;
    }

    public Panier update(Panier panier) {
    	if (panier.getId() == null) {
            throw new RuntimeException("Article sans id - modification impossible");
        }
        return daoPanier.save(panier);
    }

    public void deleteById(Integer id) {
        daoPanier.deleteById(id);
    }
}
