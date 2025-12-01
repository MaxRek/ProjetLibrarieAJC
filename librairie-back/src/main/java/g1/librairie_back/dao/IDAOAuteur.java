package g1.librairie_back.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import g1.librairie_back.model.Auteur;

public interface IDAOAuteur extends JpaRepository<Auteur, Integer> {

}
