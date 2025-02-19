import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})
export class ToDoListComponent implements OnInit {
  showAddTaskForm = false;

  taskTitle: string = '';
  taskDescription: string = '';
  tasks: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  toggleAddTask() {
    this.showAddTaskForm = !this.showAddTaskForm;
  }

  addTask() {
    if (!this.taskTitle.trim()) {
      alert('Task title cannot be empty.');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: this.taskTitle,
      description: this.taskDescription,
      completed: false,
    };

    this.tasks.unshift(newTask);
    this.saveTasks();
    this.taskTitle = '';
    this.taskDescription = '';
    this.showAddTaskForm = false;
  }

  toggleTaskCompletion(task: any) {
    task.completed = !task.completed;
    this.saveTasks();
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
