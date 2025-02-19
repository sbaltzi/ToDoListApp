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
  username: string = '';
  showAddTaskForm = false;
  taskTitle: string = '';
  taskDescription: string = '';
  tasks: any[] = [];
  showSuccessMessage: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    this.username = currentUser ? JSON.parse(currentUser).username : null;
    this.loadTasks();
  }

  toggleAddTask() {
    this.showAddTaskForm = !this.showAddTaskForm;
  }

  addTask() {
    if (!this.hasTitle()) {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: this.taskTitle,
      description: this.taskDescription,
      createdAt: new Date().toISOString(),
      username: this.username,
      completed: false,
    };

    this.tasks.unshift(newTask);
    this.saveTasks();
    this.taskTitle = '';
    this.taskDescription = '';
    this.showAddTaskForm = false;
    this.showSuccessMessage = true;

    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  hasTitle() {
    return this.taskTitle.trim();
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

  completedTasks() {
    return this.tasks
      .filter(task => task.completed)
      .filter(task => task.username === this.username)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  pendingTasks() {
    return this.tasks
      .filter(task => !task.completed)
      .filter(task => task.username === this.username)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}
