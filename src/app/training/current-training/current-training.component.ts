import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { StopTrainingComponent } from "./stop-training.component";
import { TrainingService } from "../training.service";
import { Store } from "@ngrx/store";
import * as fromTraining from "../training.reducer";
import { Exercise } from "../exercise.model";
import { take } from 'rxjs/operators';
@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.scss"]
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;
  constructor(
    private store: Store<fromTraining.State>,
    private dialog: MatDialog,
    private train: TrainingService
  ) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      const step = (ex.duration / 100) * 1000;
      this.timer = setInterval(() => {
        this.progress += 1;
        if (this.progress >= 100) {
          this.train.completeExercise();
          clearInterval(this.timer);
        }
      }, step);
    });
  }
  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.train.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
