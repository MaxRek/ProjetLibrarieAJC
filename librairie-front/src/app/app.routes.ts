import { Routes } from '@angular/router';
import { Auteur } from './page/auteur/auteur';
import { Livre } from './page/livre/livre';
import { Genre} from './page/genre/genre';
import { Papeterie } from './page/papeterie/papeterie';
import { Article } from './page/article/article';
import { Home } from './page/home/home';

export const routes: Routes = [
    { path: 'auteur', component: Auteur },
    { path: 'livre', component: Livre },
    { path: 'genre', component: Genre },
    { path: 'papeterie', component: Papeterie },
    { path: 'article', component: Article },
    //{ path: '', component: Home},
    { path: 'home', component: Home}
];

