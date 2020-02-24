import { Player } from "./../../shared/player";
import { ApiService } from "./../../shared/api.service";
import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatPaginator, MatTableDataSource, MatSort } from "@angular/material";

@Component({
  selector: "app-players-list",
  templateUrl: "./players-list.component.html",
  styleUrls: ["./players-list.component.css"]
})
export class PlayersListComponent implements OnInit {
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

  constructor(private apiService: ApiService, private router: Router) {
    this.apiService.GetPlayers().subscribe(data => {
      this.PlayerData = data;
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

  ngOnInit() {}

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

  deletePlayer(index: number, e) {
    if (window.confirm("Are you sure")) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.apiService.DeletePlayer(e._id).subscribe();
      alert("Deleted Player");
    }
  }
}
