import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})
export class ToDoListComponent implements OnInit {
  @ViewChild('logoutModal') logoutModal!: ElementRef;
  modalInstance: any;
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

  openLogoutModal() {
    this.modalInstance = new bootstrap.Modal(this.logoutModal.nativeElement);
    this.modalInstance.show();
  }

  confirmLogout() {
    localStorage.removeItem('currentUser');
    this.modalInstance.hide();
    this.router.navigate(['/login']);
  }
}
