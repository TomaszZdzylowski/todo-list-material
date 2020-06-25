import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  listOfTasks = [];

  constructor(private todos: TodosService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listOfTasks, event.previousIndex, event.currentIndex);
  }

  getAllTasks() {
    this.todos.getAllTasks().subscribe(response => {
      this.listOfTasks = response;
      console.log(response);
    });

  }

}
