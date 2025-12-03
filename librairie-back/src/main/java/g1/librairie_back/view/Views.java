package g1.librairie_back.view;

public class Views {

public class Common {}  
	
	public class Compte extends Common {} 
	
	public class Admin extends Common {} 
	
	public class Client extends Common{} 
	
	public class ClientWithSuivi extends Client {}
	
	public class ClientWithReview extends Client {}
	
	public class ClientWithAchat extends Client {}
	
	public class Livre extends Common{}
	
	public class Article extends Common{}
	
	public class ArticleWithSuivis extends Article {}
	
	public class ArticleWithReviews extends Article {}
	
	public class ArticleWithAchats extends Article {}
	
	public class ArticleWithPaniers extends Article {}
	
	public class Papeterie extends Common{}
	
	public class Auteur extends Common{}
	
	public class AuteurWithLivre extends Auteur {}
	
	public class Review extends Common {}
	
	public class ReviewWithClient extends Review {}
	
	public class ReviewWithArticle extends Review {}

	public class Achat extends Common {}
	public class Panier extends Common {}
	
	public class AchatWithClient extends Achat {}
	
	public class AchatWithArticle extends Achat {}
	
	public class Suivi extends Common{}
	
}
