package g1.librairie_back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import g1.librairie_back.dao.IDAOCompte;
import g1.librairie_back.model.Admin;
import g1.librairie_back.model.Client;
import g1.librairie_back.model.Compte;


@Service
public class CompteService {

	@Autowired
	IDAOCompte daoCompte;
	
	public Compte getById(Integer id)
	{
		Optional<Compte> opt = daoCompte.findById(id);
		if(opt.isEmpty()) {return null;}
		else {return opt.get();}
	}

	public Client getClientById(Integer id)
	{
		Optional <Compte> opt = daoCompte.findById(id);
		if(opt.isEmpty()) {return null;}
		else {return (Client)opt.get();}
	}

	public Admin getAdminById(Integer id)
	{
		Optional <Compte> opt = daoCompte.findById(id);
		if(opt.isEmpty()) {return null;}
		else {

			if(opt.get() instanceof Admin)
			{
				return (Admin)opt.get();
			}
			else
			{
				throw new RuntimeException("L'id recu n'est pas celui d'un admin.");
			}
		}
	}
	

	public List<Admin> getAllAdmins()
	{
		return daoCompte.findAllAdmin();
	}

	public List<Client> getAllClients()
	{
		return daoCompte.findAllClient();
	}

	public List<Compte> getAll()
	{
		return daoCompte.findAll();
	}

	public Compte create(Compte compte)
	{
		if(compte.getId()!=null)
		{
			throw new RuntimeException("Création impossible - id déjà existant");
		}
		return daoCompte.save(compte);
	}

	public Compte update(Compte compte)
	{
		if(compte.getId()==null)
		{
			throw new RuntimeException("Compte sans id - modification impossible");
		}

		if (compte.getPassword() != null) {
			compte.setPassword(compte.getPassword());
		}

		return daoCompte.save(compte);
	}

	public Compte updateInfosConnect(Integer id,String login,String password)
	{
		Compte compte = daoCompte.findById(id).get();
		compte.setEmail(login);
		compte.setPassword(password);
		return daoCompte.save(compte);
	}

	public void deleteById(Integer id)
	{
		daoCompte.deleteById(id);
	}

	public void delete(Compte compte)
	{
		daoCompte.delete(compte);
	}
	
	
}
