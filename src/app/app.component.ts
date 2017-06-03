import { Component } from '@angular/core';
import { TodoDataService } from './todo-data.service';
import { Todo } from './todo';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent {
  newTodo: Todo = new Todo();
  constructor(private todoDataService: TodoDataService) {
  }
  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }
  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }
  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }
  get todos() {
    return this.todoDataService.getAllTodos();
  }
  numberSort() {
    let list = document.querySelector(".todo-main-list");
    let items = list.children;
    let itemsArr = [];
    for (let i in items) {
      if (items[i].nodeType === 1) {
        itemsArr.push(items[i]);
      }
    }
    itemsArr.sort(function (a, b) {
      let var1 = parseInt(a.querySelector(".todo-content").innerHTML, 10),
        var2 = parseInt(b.querySelector(".todo-content").innerHTML, 10);
      return var1 - var2;
    });
    for (let i = 0; i < itemsArr.length; ++i) {
      list.appendChild(itemsArr[i]);
    }
  }
  nameSort() {
    let list = document.querySelector(".todo-main-list");
    let items = list.children;
    let itemsArr = [];
    for (let i in items) {
      if (items[i].nodeType === 1) {
        itemsArr.push(items[i]);
      }
    }
    itemsArr.sort(function (a, b) {
      let var1 = a.querySelector(".todo-content").innerHTML.slice(3),
        var2 = b.querySelector(".todo-content").innerHTML.slice(3);
      return var1 === var2 ? 0 : (var1 > var2 ? 1 : -1);
    });

    for (let i = 0; i < itemsArr.length; ++i) {
      list.appendChild(itemsArr[i]);
    }
  }
  removeCompeleted() {
    for (let i = (this.todos.length - 1); i > -1; i--) {
      if (this.todos[i].complete) {
        this.todos.splice(i, 1);
      }
    }
  }
  log() {
    if (document.querySelector(".todo-main-list")) {
      console.log(document.querySelector(".todo-main-list").children);
    }
  }
}
