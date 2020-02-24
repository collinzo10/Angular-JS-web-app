import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddPlayerComponent } from "./components/add-player/add-player.component";
import { EditPlayerComponent } from "./components/edit-player/edit-player.component";
import { PlayersListComponent } from "./components/players-list/players-list.component";
import { PlayerRankingsComponent } from "./components/player-rankings/player-rankings.component";
import { JoinGameComponent } from "./components/join-game/join-game.component";
import { AdminLoginComponent } from "./components/admin-login/admin-login.component";
import { AuthGuard } from "./auth/auth.guard";
import { GamesListComponent } from "./components/games-list/games-list.component";
import { ViewGamesComponent } from "./components/view-games/view-games.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "player-rankings" },
  {
    path: "add-player",
    component: AddPlayerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit-player/:id",
    component: EditPlayerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "players-list",
    component: PlayersListComponent,
    canActivate: [AuthGuard]
  },
  { path: "player-rankings", component: PlayerRankingsComponent },
  { path: "join-game/:id", component: JoinGameComponent },
  { path: "admin-login", component: AdminLoginComponent },
  {
    path: "games-list",
    component: GamesListComponent,
    canActivate: [AuthGuard]
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
