import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../models/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem,
  CdkDropList, CdkDropListContainer, CdkDropListGroup, CdkDropListInternal } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input() listTodo: string[];
  @Input() listDone: string[];

  @Input() listItemTodo: Task[];
  @Input() listItemDone: Task[];

    // lista para testes
    todo = [
      'Ir para Academia',
      'Almocar',
      'Tirar um descanso',
      'Estudar'
    ];

    // todo = this.listTodo;

    done = [
      'Acordar',
      'Fazer o teste',
      'Escrever codigo',
      'Praticar Ingles'
    ];

  constructor() {
    this.listTodo = [];
    this.listDone = [];

    this.listItemTodo = [];
    this.listItemDone = [];
  }

  ngOnInit() {

    if (this.listTodo === []) {
      //this.listTodo = this.todo;
    }
    if (this.listDone === []) {
      //this.listDone = this.done;
    }

  }

  //function for listening to the event
  drag(event: CdkDragDrop<string[]>) {

  //Movimento dentro da coluna
    if (event.previousContainer === event.container) {
    moveItemInArray(
  event.container.data, event.previousIndex, event.currentIndex);
    }

  //Movimento entre as colunas
    else {
    transferArrayItem(event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex);
    }
  }

  public cliqueList(str: string): string[] {
    this.listTodo.push(str);
    return this.listTodo
  }

  private validaObj(lista: []) {
    if (typeof lista === "object") {

    }
  }

}


