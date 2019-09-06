import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;
  constructor(private dialog: MatDialog, private train: TrainingService  ) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer(){
    const step = this.train.getRunningExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress += 1;
      if(this.progress >= 100){
        this.train.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }
  onStop() {
    clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponent, {data: {progress: this.progress}});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.train.cancelExercise(this.progress);
      }else{
        this.startOrResumeTimer();
      }
    })
  }
}
