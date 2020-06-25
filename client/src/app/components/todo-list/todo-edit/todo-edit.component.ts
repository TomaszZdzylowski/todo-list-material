import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodosService } from '../../../services/todos.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {

  isVisible = false;
  editTaskForm: FormGroup;
  @Output() modalEvent = new EventEmitter();

  constructor(private fb: FormBuilder, private todos: TodosService) { }

  ngOnInit(): void {
    this.editTaskForm = this.fb.group({
      title: [null, [
        Validators.required
      ]],
      description: [null, [
        Validators.required
      ]]
    });
  }

  editTask(taskId) {
    const data = {
      title: this.editTaskForm.get(['title']).value,
      description: this.editTaskForm.get(['description']).value
    };
    this.todos.editTask(taskId, data).subscribe(response => {
      console.log(response);
      this.sendValue();
      this.todos.subjectTasks.next(true);
    });
  }

  sendValue() {
    this.modalEvent.emit(this.isVisible);
  }

  get title() {
    return this.editTaskForm.get('title');
  }

  get description() {
    return this.editTaskForm.get('description');
  }
}
