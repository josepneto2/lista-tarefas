import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Tarefa } from '../../../Tarefa';
import { TaskItemComponent } from '../task-item/task-item.component';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  imports: [TaskItemComponent, CommonModule, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit{
  private readonly taskService = inject(TaskService);

  tarefas: Tarefa[] = [];
  
  ngOnInit(){
    this.taskService.getTasks().subscribe((dados) => {
      this.tarefas = dados;
    })
  }

  deleteTask(tarefa: Tarefa) {
    this.taskService.deleteTask(tarefa).subscribe(() => {
      this.tarefas = this.tarefas.filter(t => t.id !== tarefa.id)
    });
  }

  toggleConcluido(tarefa: Tarefa) {
    tarefa.concluido = !tarefa.concluido;
    this.taskService.updateTask(tarefa).subscribe();
  }

  addTask(tarefa: Tarefa) {
    this.taskService.createTask(tarefa).subscribe((tarefa) => {
      this.tarefas.push(tarefa);
    })
  }
}
