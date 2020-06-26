import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TodosService } from '../../services/todos.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  listOfTasks = [];
  isVisible = false;
  taskId: String;


  constructor(private todos: TodosService) { }

  ngOnInit(): void {
    this.getAllTasks();
    this.todos.subjectTasks.subscribe(() => {
      this.getAllTasks();
    });
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listOfTasks, event.previousIndex, event.currentIndex);
  }

  getAllTasks() {
    this.todos.getAllTasks().pipe(take(1)).subscribe(response => {
      this.listOfTasks = response;
      console.log(response);
    });
  }

  deleteTask(taskId) {
    this.todos.deleteTask(taskId).subscribe(response => console.log(response));
    this.todos.subjectTasks.next(false);
  }

  showModal(id) {
    this.isVisible = true;
    this.taskId = id;
  }

  reciveValue($event) {
    this.isVisible = $event;

  }

}
