import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { TareasService } from './tareas.service';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  tasks: any[] = [];
  newTask = {
    title: '',
    description: '',
    date: ''
  };
  editMode = false;
  taskIdToEdit: string | null = null;

  public id: string = "";

  constructor(
    private tareasService: TareasService,
    private authService: AuthService,
    private router: Router,
    private loadsrv: LoadingService,
    private navctrl: NavController
  ) {}

  async ngOnInit() {

    this.id = await this.authService.getCurrentUID();

  }

  ionViewWillEnter() {
    this.getTasks();
  }

  getTasks() {
    const db = getDatabase();
    const tareasRef = ref(db, `tareas/${this.id}`); // Obtener solo las tareas del usuario actual
    onValue(tareasRef, (snapshot) => {
      this.tasks = [];
      snapshot.forEach((childSnapshot) => {
        const tarea = childSnapshot.val();
        this.tasks.push({
          id: childSnapshot.key,
          ...tarea,
        });
      });
    });
  }


  addTask() {
    if (this.newTask.title && this.newTask.description && this.newTask.date) {
      if (this.editMode && this.taskIdToEdit) {
        this.tareasService.updateTask(this.id, this.taskIdToEdit, this.newTask.title, this.newTask.description, this.newTask.date);
      } else {
        this.tareasService.agregarTarea(this.id, this.newTask.title, this.newTask.description, this.newTask.date);
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
    this.tareasService.deleteTask(this.id, id);
  }


  private resetTaskForm() {
    this.newTask = { title: '', description: '', date: '' };
    this.editMode = false;
    this.taskIdToEdit = null;
  }


  public async logout() {
    await this.loadsrv.show();
    await this.authService.logout();
    await this.loadsrv.dismiss();
    this.navctrl.navigateForward("");
  }
}
