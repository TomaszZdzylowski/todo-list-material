import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodosService } from '../../../services/todos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {

  isVisible: boolean = false;
  editTaskForm: FormGroup;
  @Output() modalEvent: EventEmitter<any> = new EventEmitter();
  @Input() taskId: string;

  constructor(private fb: FormBuilder, private todos: TodosService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.editTaskForm = this.fb.group({
      title: [null, [
        Validators.required
      ]],
      description: [null, [
        Validators.required
      ]]
    });
    this.getDataTask(this.taskId);
  }

  onSubmit(): void {
    this.editTask(this.taskId);
    this.openSnackBar('Task edited', '🤯');
  }

  editTask(taskId: string): void {
    const data = {
      title: this.editTaskForm.get(['title']).value,
      description: this.editTaskForm.get(['description']).value
    };

    this.todos.editTask(taskId, data).subscribe(({ ok }) => {
      if (ok === 1) {
        this.sendValue();
        this.todos.subjectTasks.next(true);
      }
    });
  }

  getDataTask(taskId: string): void {
    this.todos.getSingleTask(taskId).subscribe(response => {
      this.editTaskForm.setValue({
        title: response.title,
        description: response.description
      })
    });
  }

  sendValue(): void {
    this.modalEvent.emit(this.isVisible);
  }

  get title() {
    return this.editTaskForm.get('title');
  }

  get description() {
    return this.editTaskForm.get('description');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1500,
    });
  }
}
