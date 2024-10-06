// src/app/home/home.page.ts
import { Component } from '@angular/core';
import { TareasService } from './tareas.service';
import { getDatabase, ref, onValue } from 'firebase/database';
import { AuthService } from '../shared/services/auth/auth.service';  // Importar el servicio de autenticación
import { Router } from '@angular/router';  // Para redirigir después del logout

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
  editMode = false;  // Indica si estamos en modo edición
  taskIdToEdit: string | null = null;  // Para almacenar el ID de la tarea que se está editando

  constructor(
    private tareasService: TareasService,
    private authService: AuthService,  // Inyectar el servicio de autenticación
    private router: Router  // Inyectar el enrutador para redirigir
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

  // Añadir o actualizar tarea
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

  // Editar tarea
  editTask(task: any) {
    this.newTask = { title: task.title, description: task.description, date: task.date };
    this.taskIdToEdit = task.id;
    this.editMode = true;
  }

  // Eliminar tarea
  deleteTask(id: string) {
    this.tareasService.deleteTask(id);
  }

  // Resetear el formulario después de añadir o editar una tarea
  private resetTaskForm() {
    this.newTask = { title: '', description: '', date: '' };
    this.editMode = false;
    this.taskIdToEdit = null;
  }

  // Cerrar sesión
  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);  // Redirigir a login después del logout
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
