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
  isVisible: boolean = false;
  @Output() modalEvent: EventEmitter<any> = new EventEmitter();

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

  onSubmit(): void {
    this.addTask();
    this.openSnackBar('Task added', '🙈');
  }

  addTask(): void {
    const data = {
      title: this.addTaskForm.get(['title']).value,
      description: this.addTaskForm.get(['description']).value
    };

    this.todos.addTask(data).subscribe(() => {
      this.sendValue();
      this.todos.subjectTasks.next(true);
    });
  }

  sendValue(): void {
    this.modalEvent.emit(this.isVisible);
  }

  get title() {
    return this.addTaskForm.get('title');
  }

  get description() {
    return this.addTaskForm.get('description');
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 1500,
    });
  }


}
