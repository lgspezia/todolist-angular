import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url = 'http://localhost:3000/tasks'; // api rest fake

  // injetando o HttpClient
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

  // Obtem um carro pelo id
  getTaskById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um carro
  saveTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.url, JSON.stringify(task), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um carro
  updateTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(this.url + '/' + task.id, JSON.stringify(task), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Deleta um carro
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
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
