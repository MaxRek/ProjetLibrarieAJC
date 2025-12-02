package g1.librairie_back.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import g1.librairie_back.model.Article;
import g1.librairie_back.model.Livre;
import g1.librairie_back.model.Papeterie;

@Repository
public interface IDAOArticle extends JpaRepository<Article,Integer>{
	
    @Query("from Livre")
	public List<Livre> findAllLivres();
	
	@Query("from Papeterie")
	public List<Papeterie> findAllPapeteries();

}
