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
import { LoginPage } from './page/user/login/login';
import { AuthAdminGuard } from './guard/auth-admin-guard';
import { AuthClientGuard } from './guard/auth-client-guard';

export const routes: Routes = [
    { path: 'auteur', component: Auteur, canActivate: [AuthAdminGuard] },
    { path: 'livre', component: Livre, canActivate: [AuthAdminGuard] },
    { path: 'papeterie', component: Papeterie, canActivate: [AuthAdminGuard] },
    { path: 'home', component: Home},
    { path: 'catalogue', component: Catalogue },
    { path: 'client', component: Client, canActivate: [AuthAdminGuard] },
    { path: 'administrateur', component: Administrateur, canActivate: [AuthAdminGuard] },
    { path: 'achat', component: Achat, canActivate: [AuthAdminGuard] },
    { path: 'suivi', component: Suivi, canActivate: [AuthAdminGuard]},
    { path: 'panier', component: Panier, canActivate: [AuthAdminGuard] },
    { path: 'review', component: Review, canActivate: [AuthAdminGuard] },
    { path: 'user/panier', component: PanierUser, canActivate: [AuthClientGuard]  },
    { path: 'user/achat', component: AchatUser, canActivate: [AuthClientGuard]  },
    { path: 'user/suivi', component: SuiviUser, canActivate: [AuthClientGuard]  },
    { path: 'user/review', component: ReviewUser, canActivate: [AuthClientGuard]  },
    { path: 'connexion', component: LoginPage },
    // Redirection par défaut vers la page d'accueil
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];

