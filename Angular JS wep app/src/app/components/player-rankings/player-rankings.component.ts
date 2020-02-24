import { Component, ViewChild, OnInit } from "@angular/core";
import { Player } from "./../../shared/player";
import { ApiService } from "./../../shared/api.service";
import { MatPaginator, MatTableDataSource, MatSort } from "@angular/material";


@Component({
  selector: "app-player-rankings",
  templateUrl: "./player-rankings.component.html",
  styleUrls: ["./player-rankings.component.css"]
})
export class PlayerRankingsComponent implements OnInit {
  PlayerData: any = [];
  dataSource: MatTableDataSource<Player>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [
    "player_name",
    "player_rank",
    "score",
    "time",
    "favorite_game",
    "status",
    "action"
  ];

  constructor(private playerApi: ApiService) {4
    this.playerApi.GetPlayers().subscribe(data => {
      this.PlayerData = data;
      console.log(data);
      this.dataSource = new MatTableDataSource<Player>(this.PlayerData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = 
        (data: Player, filtersJson: string) => {
            const matchFilter = [];
            const filters = JSON.parse(filtersJson);
      
            filters.forEach(filter => {
              const val = data[filter.id] === null ? '' : data[filter.id];
              matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
            });
              return matchFilter.every(Boolean);
          };
        
      }, 0);
    });
  }

  ngOnInit() {
  
  }
  
  applyFilter(filterValue: string) {
    const tableFilters = [];
    tableFilters.push({
      id: 'player_name', 
      value: filterValue
    });


    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Attempt to make filter work multiple parameters instead of just name
  /*
  newFilter(filter: any){
    const filteredData = this.PlayerData.filter(name => name.player_name.includes(filter) || name.favorite_game.includes(filter));
    console.log(filteredData);
    this.dataSource.filter = JSON.stringify(filteredData);
  }*/

}

