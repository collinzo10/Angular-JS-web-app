import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService, } from "./../../shared/api.service";
import { Player } from "./../../shared/player";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {
  playerData: any = {};
  joinGameForm: FormGroup;
  id: string;
  gamesList: string[] = ["Fortnite", "League of Legends", "Call of Duty", "Battlefield", "Dwarf Fortress", "World of Warcraft", "Starcraft", "Minecraft", "PUBG", "DOTA 2", "Counter-Strike: Global Offensive", "Team Fortress 2", "DOOM", "Fallout New Vegas", "Overwatch" ];
  constructor(private playerApi: ApiService, private route: ActivatedRoute, public fb: FormBuilder, private router: Router,
    private ngZone: NgZone,) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.playerApi.GetPlayer(this.id).subscribe(data => {
      this.playerData = data;
      console.log(data);
    });
  }

  ngOnInit() {
    this.initJoinGameForm();
  }

  initJoinGameForm(){
    this.joinGameForm = this.fb.group({
      player_name: [""],
      player_rank: [""],
      score: [""],
      time: [""],
      favorite_game: [""],
      status: [""],
      selectedGame: ["", [Validators.required]],
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.joinGameForm.controls[controlName].hasError(errorName);
  }

  submitJoinGameForm() {
    if (this.joinGameForm.valid) {
      this.joinGameForm.setValue({
        player_name: this.playerData.player_name,
        player_rank: this.playerData.player_rank,
        score: this.playerData.score,
        time: this.playerData.time,
        favorite_game: this.playerData.favorite_game,
        status: "Unavailable",
        selectedGame: this.joinGameForm.get("selectedGame").value,
      });
      this.playerApi.UpdatePlayer(this.id, this.joinGameForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl("/player-rankings"));
      });
    }
  }

}
