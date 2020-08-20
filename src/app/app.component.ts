import { Component, Input, OnInit } from '@angular/core';

import { TaskService } from './services/task.service';
import { Task } from './models/task';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public task = {} as Task;
  public tasks: Task[];
  public title: string;

    public listTodo: string[];
    public items = [];
    public newTask: string;

       constructor(private taskService : TaskService) {
        this.listTodo = [];
        this.title  = 'TO DO App';
       }

       ngOnInit() {
        this.getTasks();
      }

       /* Adiciona para a lista */
       public addToList() {
           if (this.newTask == '') {
           }
           else {
               this.items.push(this.newTask);
               this.newTask = '';

           }
       }

       /* Apaga a tarefa */
       public deleteTask(index) {
           this.items.splice(index, 1);
       }

       public clique(str: string): string[] {
        this.listTodo.push(str);
        return this.listTodo
      }

      //// regras de consumo e persistencia dos dados
       // define se uma tarefa será criada ou atualizada
  saveTask(form: NgForm) {
    if (this.task.id !== undefined) {
      this.taskService.updateTask(this.task).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.taskService.saveTask(this.task).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os carros
  getTasks() {
    this.taskService.getTasks().subscribe((task: Task[]) => {
      this.tasks = task;
    });
  }

  // deleta uma tarefa
  deleteTasks(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.getTasks();
    });
  }

  // copia o carro para ser editado.
  editTask(car: Task) {
    this.task = { ...car };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getTasks();
    form.resetForm();
    this.task = {} as Task;
  }

}

