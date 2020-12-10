import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Game } from 'src/app/shared/models/game.model';

@Component({
  selector: 'app-created-match-dialog',
  templateUrl: './created-match-dialog.component.html',
  styleUrls: ['./created-match-dialog.component.scss']
})
export class CreatedMatchDialogComponent implements OnInit {

  game: Game;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.game = this.data.game;
    console.log("Game in dialog", this.game);
  }

  ngOnInit(): void {
  }

}
