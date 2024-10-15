import { Injectable } from '@angular/core';
import { getDatabase, ref, push, update, remove } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  constructor() {}

  agregarTarea(userId: string, title: string, description: string, date: string) {
    const db = getDatabase();
    const tareasRef = ref(db, `tareas/${userId}`); // Guardar tarea bajo el id de usuario
    push(tareasRef, {
      title,
      description,
      date,
    });
  }

  updateTask(userId: string, taskId: string, title: string, description: string, date: string) {
    const db = getDatabase();
    const taskRef = ref(db, `tareas/${userId}/${taskId}`); // Actualizar tarea del usuario
    update(taskRef, { title, description, date });
  }

  deleteTask(userId: string, taskId: string) {
    const db = getDatabase();
    const taskRef = ref(db, `tareas/${userId}/${taskId}`); // Eliminar tarea del usuario
    remove(taskRef);
  }
}
