import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';
import { UIService } from 'src/app/shared/ui.service';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSub: Subscription;
  isLoading = false;
  private isLoadingSub: Subscription;
  constructor(private trainingService: TrainingService, private uiService: UIService) { }

  ngOnInit() {
    this.uiService.loadingStateChanged.next(true);
    this.exerciseSub = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
      this.uiService.loadingStateChanged.next(false);
    });
    this.isLoadingSub = this.uiService.loadingStateChanged.subscribe((state) => {
      this.isLoading = state;
    })
    this.fetchExercises();
  }

  fetchExercises(){
    this.trainingService.fetchAvailExercises();
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(){
    if(this.exerciseSub){
    this.exerciseSub.unsubscribe();
    }
    if(this.isLoadingSub){
    this.isLoadingSub.unsubscribe();
    }
  }
}
