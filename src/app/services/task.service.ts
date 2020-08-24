import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url = 'http://localhost:3000/tasks';
  // url = http://tasks-prod.k8s-platform-prod-us-east-1.fluig.io/tasks/api-docs?group=v2

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os carros
  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem uma tarefa pelo id
  getTaskById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um tarefa
  saveTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.url, JSON.stringify(task), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Atualiza uma tarefa
  updateTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(this.url + '/' + task.id, JSON.stringify(task), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Apaga uma tarefa
  deleteTask(task: Task) {
    return this.httpClient.delete<Task>(this.url + '/' + task.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro no client
      errorMessage = error.error.message;
    } else {
      // Erro no servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
