import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem,
  CdkDropList, CdkDropListContainer, CdkDropListGroup, CdkDropListInternal } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input() listTodo: string[];

  constructor() {
    this.listTodo = [];
  }

  ngOnInit() {

  }

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

  //function for listening to the event

  drag(event: CdkDragDrop<string[]>) {

  //if movement if within the same container

    if (event.previousContainer === event.container) {
    moveItemInArray(
  event.container.data, event.previousIndex, event.currentIndex);
    }

  //if movement if to other containers

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

}

/////

