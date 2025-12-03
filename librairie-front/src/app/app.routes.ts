import { Routes } from '@angular/router';
import { Auteur } from './page/administration/auteur/auteur';
import { Livre } from './page/administration/livre/livre';
import { Genre} from './page/administration/genre/genre';
import { Papeterie } from './page/administration/papeterie/papeterie';
import { Article } from './page/administration/article/article';
import { Catalogue } from './page/user/catalogue/catalogue';
import { Home } from './page/user/home/home';
import { Compte } from './page/administration/compte/compte';
import { Client } from './page/administration/client/client';
import { Administrateur } from './page/administration/administrateur/administrateur';
import { Achat } from './page/administration/achat/achat';
import { Suivi } from './page/administration/suivi/suivi';
import { Panier } from './page/administration/panier/panier';
import { Review } from './page/administration/review/review';

export const routes: Routes = [
    { path: 'auteur', component: Auteur },
    { path: 'livre', component: Livre },
    { path: 'genre', component: Genre },
    { path: 'papeterie', component: Papeterie },
    { path: 'article', component: Article },
    { path: 'home', component: Home},
    { path: 'catalogue', component: Catalogue },
    { path: 'compte', component: Compte },
    { path: 'client', component: Client },
    { path: 'administrateur', component: Administrateur },
    { path: 'achat', component: Achat },
    { path: 'suivi', component: Suivi },
    { path: 'panier', component: Panier },
    { path: 'review', component: Review }
    // Redirection par défaut vers la page d'accueil
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];

