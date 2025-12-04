import { Routes } from '@angular/router';
import { Auteur } from './page/administration/auteur/auteur';
import { Livre } from './page/administration/livre/livre';
import { Papeterie } from './page/administration/papeterie/papeterie';
import { Catalogue } from './page/user/catalogue/catalogue';
import { Home } from './page/user/home/home';
import { Client } from './page/administration/client/client';
import { Administrateur } from './page/administration/administrateur/administrateur';
import { Achat } from './page/administration/achat/achat';
import { Suivi } from './page/administration/suivi/suivi';
import { Panier } from './page/administration/panier/panier';
import { Review } from './page/administration/review/review';
import { PanierUser } from './page/user/panier/panier';
import { AchatUser } from './page/user/achat/achat';
import { SuiviUser } from './page/user/suivi/suivi';
import { ReviewUser } from './page/user/review/review';
import { FicheLivre } from './page/user/fiche/fiche-livre/fiche-livre';
import { FichePapeterie } from './page/user/fiche/fiche-papeterie/fiche-papeterie';

export const routes: Routes = [
    { path: 'auteur', component: Auteur },
    { path: 'livre', component: Livre },
    { path: 'papeterie', component: Papeterie },
    { path: 'home', component: Home},
    { path: 'catalogue', component: Catalogue },
    { path: 'client', component: Client },
    { path: 'administrateur', component: Administrateur },
    { path: 'achat', component: Achat },
    { path: 'suivi', component: Suivi },
    { path: 'panier', component: Panier },
    { path: 'review', component: Review },
    { path: 'user/panier', component: PanierUser },
    { path: 'user/achat', component: AchatUser },
    { path: 'user/suivi', component: SuiviUser },
    { path: 'user/review', component: ReviewUser },
    { path: 'ficheLivre/:id', component: FicheLivre },
    { path: 'fichePapeterie/:id', component: FichePapeterie},
    // Redirection par défaut vers la page d'accueil
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];

