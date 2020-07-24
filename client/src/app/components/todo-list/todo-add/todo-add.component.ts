import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodosService } from '../../../services/todos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {

  addTaskForm: FormGroup;
  isVisible = false;
  @Output() modalEvent = new EventEmitter();

  constructor(private fb: FormBuilder, private todos: TodosService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.addTaskForm = this.fb.group({
      title: [null, [
        Validators.required
      ]],
      description: [null, [
        Validators.required
      ]]
    });
  }

  onSubmit() {
    this.addTask();
    this.openSnackBar('Task added', '🙈');
  }

  addTask() {
    const data = {
      title: this.addTaskForm.get(['title']).value,
      description: this.addTaskForm.get(['description']).value
    };
    this.todos.addTask(data).subscribe(response => {
      console.log(response);
      this.sendValue();
      this.todos.subjectTasks.next(true);
    });
  }

  sendValue() {
    this.modalEvent.emit(this.isVisible);
  }

  get title() {
    return this.addTaskForm.get('title');
  }

  get description() {
    return this.addTaskForm.get('description');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1500,
    });
  }


}
