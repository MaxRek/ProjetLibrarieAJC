import { Routes } from '@angular/router';
import { Auteur } from './page/administration/auteur/auteur';
import { Livre } from './page/administration/livre/livre';
import { Genre} from './page/administration/genre/genre';
import { Papeterie } from './page/administration/papeterie/papeterie';
import { Article } from './page/administration/article/article';
import { Catalogue } from './page/user/catalogue/catalogue';
import { Home } from './page/user/home/home';

export const routes: Routes = [
    { path: 'auteur', component: Auteur },
    { path: 'livre', component: Livre },
    { path: 'genre', component: Genre },
    { path: 'papeterie', component: Papeterie },
    { path: 'article', component: Article },
    { path: 'home', component: Home},
    { path: 'catalogue', component: Catalogue }

];

