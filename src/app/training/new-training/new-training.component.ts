import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  constructor() { }
  @Output() trainingStart = new EventEmitter<void>();
  ngOnInit() {
  }

  onStartTraining() {
    this.trainingStart.emit();
  }
}
