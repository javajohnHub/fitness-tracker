import { Exercise } from "./exercise.model";
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private fbSubs: Subscription[] = [];
  private availableExercises: Exercise[] = [];

  private runningExercise: Exercise;
  constructor(private db: AngularFirestore){}

  fetchAvailExercises(){
    this.fbSubs.push(this.db
    .collection('availableExercises')
    .snapshotChanges()
    .pipe(map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          name: doc.payload.doc.data()['name'],
          duration: doc.payload.doc.data()['duration'],
          calories: doc.payload.doc.data()['calories'],
        };
      });
    })).subscribe((exercises: Exercise[]) => {
      this.availableExercises = exercises;
      this.exercisesChanged.next([...this.availableExercises]);
    }));
  }


  startExercise(selectedId: string){
    //this.db.doc('availableExercises/' + selectedId).update({lastselected: new Date()})
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise})
  }

  completeExercise(){
    this.addDataToDB({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number){
    this.addDataToDB({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress /100),
      calories: this.runningExercise.calories * (progress /100),
      date: new Date(),
      state: 'cancelled'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  getRunningExercise(){
    return {...this.runningExercise};
  }

  fetchCompletedOrCancelledExercises(){
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges()
    .subscribe((exercises: Exercise[]) => {
      this.finishedExercisesChanged.next(exercises);
    }));
  }

  cancelSubscriptions(){
    this.fbSubs.forEach((sub) => sub.unsubscribe());
  }
  private addDataToDB(exercise: Exercise){
    this.db.collection('finishedExercises').add(exercise)
  }
}
