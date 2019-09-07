import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  exerciseSub: Subscription;
  constructor(private train: TrainingService) { }

  ngOnInit() {
    this.exerciseSub = this.train.exerciseChanged.subscribe(ex => {
      if(ex){
        this.ongoingTraining = true;
      }else{
        this.ongoingTraining = false;
      }

    })
  }

  ngOnDestroy(){
    if(this.exerciseSub){
      this.exerciseSub.unsubscribe();
    }
  }

}
