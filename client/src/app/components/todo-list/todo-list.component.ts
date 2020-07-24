import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TodosService } from '../../services/todos.service';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  listOfTasks = [];
  isVisible: boolean = false;
  taskId: String;


  constructor(private todos: TodosService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllTasks();
    this.todos.subjectTasks.subscribe(() => {
      this.getAllTasks();
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listOfTasks, event.previousIndex, event.currentIndex);
  }

  getAllTasks(): void {
    this.todos.getAllTasks().pipe(take(1)).subscribe(response => {
      this.listOfTasks = response;
      console.log(response);
    });
  }

  deleteTask(taskId): void {
    this.todos.deleteTask(taskId).subscribe(response => console.log(response));
    this.todos.subjectTasks.next(false);
    this.openSnackBar('Task deleted', '🙊');
  }

  showModal(id): void {
    this.isVisible = true;
    this.taskId = id;
  }

  reciveValue($event): void {
    this.isVisible = $event;

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1500,
    });
  }

}
