package g1.librairie_back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import g1.librairie_back.dao.IDAOSuivi;
import g1.librairie_back.model.Suivi;

@Service
public class SuiviService {

	@Autowired
	IDAOSuivi daoSuivi;
	
	public List<Suivi> getAll()
	{
		return daoSuivi.findAll();
	}
	
	public Suivi getById(Integer id) {
		Optional<Suivi> opt = daoSuivi.findById(id);
		if(opt.isEmpty()) {return null;}
		else {return opt.get();}
    }

    public Suivi create(Suivi suivi) {
        if (suivi.getId() != null) {
            throw new RuntimeException("Création impossible - id déjà existant");
        }
        Suivi saved = daoSuivi.save(suivi);
        return saved;
    }

    public Suivi update(Suivi suivi) {
    	if (suivi.getId() == null) {
            throw new RuntimeException("Suivi sans id - modification impossible");
        }
        return daoSuivi.save(suivi);
    }

    public void deleteById(Integer id) {
        daoSuivi.deleteById(id);
    }
}
