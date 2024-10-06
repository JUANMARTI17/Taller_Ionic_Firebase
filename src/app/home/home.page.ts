
import { Component } from '@angular/core';
import { TareasService } from './tareas.service';
import { getDatabase, ref, onValue } from 'firebase/database';
import { AuthService } from '../shared/services/auth/auth.service';  
import { Router } from '@angular/router';  

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks: any[] = [];
  newTask = {
    title: '',
    description: '',
    date: ''
  };
  editMode = false;  
  taskIdToEdit: string | null = null;  

  constructor(
    private tareasService: TareasService,
    private authService: AuthService,  
    private router: Router  
  ) {}

  ionViewWillEnter() {
    this.getTasks();
  }

  getTasks() {
    const db = getDatabase();
    const tareasRef = ref(db, 'tareas');
    onValue(tareasRef, (snapshot) => {
      this.tasks = [];
      snapshot.forEach((childSnapshot) => {
        const tarea = childSnapshot.val();
        this.tasks.push({
          id: childSnapshot.key,
          ...tarea
        });
      });
    });
  }

  
  addTask() {
    if (this.newTask.title && this.newTask.description && this.newTask.date) {
      if (this.editMode && this.taskIdToEdit) {
        this.tareasService.updateTask(this.taskIdToEdit, this.newTask.title, this.newTask.description, this.newTask.date);
      } else {
        this.tareasService.agregarTarea(this.newTask.title, this.newTask.description, this.newTask.date);
      }
      this.resetTaskForm();
    }
  }

  
  editTask(task: any) {
    this.newTask = { title: task.title, description: task.description, date: task.date };
    this.taskIdToEdit = task.id;
    this.editMode = true;
  }

  
  deleteTask(id: string) {
    this.tareasService.deleteTask(id);
  }

  
  private resetTaskForm() {
    this.newTask = { title: '', description: '', date: '' };
    this.editMode = false;
    this.taskIdToEdit = null;
  }

  
  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);  
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
