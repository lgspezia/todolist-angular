import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TaskService } from './services/task.service';
import { Task } from './models/task';

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
    public items: string[];

    public feitos: string[];
    public newTask: string;

       constructor(private taskService : TaskService) {
        this.listTodo = [];
        this.title  = 'TO DO App';

        this.items = [];
        this.feitos = ['feitos'];
       }

       ngOnInit() {
        this.getTasks();
        setTimeout(() => {
          this.items = this.atualizaItens();
        }, 50);
        this.items.push('a fazer');
      }

       /* Adiciona para a lista */
       public addToList() {
           if (this.newTask !== '') {
                         // this.listTodo.push(this.newTask);
            this.items.push(this.newTask);
            this.saveNewTask();
            this.newTask = '';
           }
       }

       /* Apaga a tarefa */
       public deleteTask(index) {
           this.items.splice(index, 1);

           this.deleteTasks(this.tasks[this.tasks.length - 1]);
       }

       public clique(str: string): string[] {
        this.listTodo.push(str);
        return this.listTodo;
      }

      // // Consumo e persistencia dos dados
       // define se uma tarefa será criada ou atualizada
  public saveTask(form: NgForm): void {
    if (this.task.id !== undefined) {
      this.taskService.updateTask(this.task).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      console.info(this.task);
      this.taskService.saveTask(this.task).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // salva nova tarefa
  public saveNewTask(): void {
    const myNumb =  Math.floor(Math.random() * (30 - 1)) + 1;
    // cria tarefa Default
    let tarefa: Task = {
      id:this.tasks.length + 1,
      title:this.newTask.toString(),
      subtitle:this.newTask.toString(),
      color:"",
      status:"",
      edited: false
    };
    this.tasks.push(tarefa);
    this.taskService.saveTask(tarefa).subscribe();
    this.items = [];
    this.items = this.atualizaItens();
  }

  // Chama o serviço para obter as tarefas
  public getTasks() {
    this.taskService.getTasks().subscribe((task: Task[]) => {
      this.tasks = task;
    });
  }

  // deleta uma tarefa
  public deleteTasks(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.getTasks();
    });
  }

  // Atualiza os itens
  public atualizaItens(): string[] {
    let myitems: string[] = [];

    if(this.tasks.length > 0) {
      this.tasks.forEach((item)=> {
        myitems.push(item.title);
      });
    }
    return myitems
  }

  // copia a tarefa para ser editado.
  public editTask(tarefa: Task) {
    this.task = { ...tarefa };
  }

  // limpa o formulario
  public cleanForm(form: NgForm) {
    this.getTasks();
    form.resetForm();
    this.task = {} as Task;
  }

}

