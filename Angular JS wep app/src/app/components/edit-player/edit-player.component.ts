import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material";
import { ApiService } from "./../../shared/api.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Player } from "./../../shared/player";

export interface favoriteGame {
  name: string;
}

@Component({
  selector: "app-edit-player",
  templateUrl: "./edit-player.component.html",
  styleUrls: ["./edit-player.component.css"]
})
export class EditPlayerComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  playerForm: FormGroup;
  favGameArray: favoriteGame[] = [
    { name: "Fortnite" },
    { name: "Call of Duty" },
    { name: "League of Legends" },
    { name: "Battlefield" },
    { name: "Dwarf Fortress" },
    { name: "World of Warcraft" },
    { name: "PUBG" },
    { name: "DOTA 2" },
    { name: "Counter-Strike: Global Offensive" },
    { name: "Team Fortress 2" },
    { name: "DOOM" },
    { name: "Fallout New Vegas" },
    { name: "Minecraft" },
    { name: "Starcraft" },
    { name: "Overwatch" }

  ];
  statusArray: any = ["Available", "Unavailable"];
  rankArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  player: Player;
  id: string;
  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private playerApi: ApiService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.playerApi.GetPlayer(this.id).subscribe(data => {
      this.player = data;
      this.playerForm.setValue({
        player_name: this.player.player_name,
        player_rank: this.player.player_rank,
        score: this.player.score,
        time: this.player.time,
        favorite_game: this.player.favorite_game,
        status: this.player.status
      });
    });
  }

  getPlayer(id) {
    this.playerApi.GetPlayer(id);
  }

  /* Reactive book form */
  submitBookForm() {
    this.playerForm = this.fb.group({
      player_name: ["", [Validators.required]],
      player_rank: ["", [Validators.required]],
      score: ["", [Validators.required]],
      time: ["", [Validators.required]],
      favorite_game: ["", [Validators.required]],
      status: ["", [Validators.required]]
    });
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || "").trim() && this.favGameArray.length < 5) {
      this.favGameArray.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  /* Remove dynamic languages */
  remove(favorite_game: favoriteGame): void {
    const index = this.favGameArray.indexOf(favorite_game);
    if (index >= 0) {
      this.favGameArray.splice(index, 1);
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  };

  /* Submit book */
  submitPlayerForm() {
    if (this.playerForm.valid) {
      this.playerApi
        .UpdatePlayer(this.id, this.playerForm.value)
        .subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl("/players-list"));
          alert("Player was edited");
        });
    }
  }
}
