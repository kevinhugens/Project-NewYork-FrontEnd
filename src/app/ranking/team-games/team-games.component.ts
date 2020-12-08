import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RankingService } from '../ranking.service';

@Component({
  selector: 'app-team-games',
  templateUrl: './team-games.component.html',
  styleUrls: ['./team-games.component.scss']
})
export class TeamGamesComponent implements OnInit {

  team: any

  id = this.route.snapshot.params['id'];
  constructor(private route: ActivatedRoute, private router: Router, private _rankingService: RankingService) {
    this._rankingService.getTeam(this.id).subscribe(result => {
      this.team = result;
    })
  }

  ngOnInit(): void {
  }

}
