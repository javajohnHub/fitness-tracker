import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const SET_AVAILABLE_TRAININGS = '[TRAINING] Set Available trainings';
export const SET_FINISHED_TRAININGS = '[TRAINING] Set Finished trainings';
export const START_TRAINING = '[TRAINING] Start training';
export const STOP_TRAINING = '[TRAINING] Stop training';

export class SetAvailableTrainings implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;

  constructor(public payload: Exercise[]){}
}

export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;

  constructor(public payload: Exercise[]){}

}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: string){}

}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;

}
export type TrainingActions = SetAvailableTrainings  | SetFinishedTrainings | StartTraining | StopTraining;