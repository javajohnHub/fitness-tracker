import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Exercise } from "../exercise.model";
import { TrainingService } from "../training.service";
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';

@Component({
  selector: "app-past-training",
  templateUrl: "./past-training.component.html",
  styleUrls: ["./past-training.component.scss"]
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns = ["date", "name", "duration", "calories", "state"];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private train: TrainingService, private store: Store<fromTraining.State>) {}

  ngOnInit() {
    this.store.select(fromTraining.getFinishedTrainings).subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    })
    this.train.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
}
