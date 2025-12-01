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
				throw new RuntimeException("L'id recu n'est pas celui d'un admin...");
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

	public Compte create(Compte Compte)
	{
		if(Compte.getId()!=null)
		{
			throw new RuntimeException("Création impossible - id déjà existant");
		}
		return daoCompte.save(Compte);
	}

	public Compte update(Compte Compte)
	{
		if(Compte.getId()==null)
		{
			throw new RuntimeException("Compte sans id - modification impossible");
		}

		if (Compte.getPassword() != null) {
			Compte.setPassword(Compte.getPassword());
		}

		return daoCompte.save(Compte);
	}

	public Compte updateInfosConnect(Integer id,String login,String password)
	{
		Compte Compte = daoCompte.findById(id).get();
		Compte.setEmail(login);
		Compte.setPassword(password);
		return daoCompte.save(Compte);
	}

	public void deleteById(Integer id)
	{
		daoCompte.deleteById(id);
	}

	public void delete(Compte Compte)
	{
		daoCompte.delete(Compte);
	}
	
	
}
