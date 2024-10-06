import { Injectable } from '@angular/core';
import { getDatabase, ref, set, push, remove } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor() {}

  agregarTarea(titulo: string, descripcion: string, fecha: string) {
    const db = getDatabase();
    const tareasRef = ref(db, 'tareas');
    const nuevaTareaRef = push(tareasRef);
    set(nuevaTareaRef, {
      title: titulo,
      description: descripcion,
      date: fecha
    }).then(() => {
      console.log('Tarea guardada con éxito.');
    }).catch((error) => {
      console.error('Error al guardar la tarea:', error);
    });
  }

  updateTask(id: string, titulo: string, descripcion: string, fecha: string) {
    const db = getDatabase();
    const tareaRef = ref(db, `tareas/${id}`);
    set(tareaRef, {
      title: titulo,
      description: descripcion,
      date: fecha
    }).then(() => {
      console.log('Tarea actualizada con éxito.');
    }).catch((error) => {
      console.error('Error al actualizar la tarea:', error);
    });
  }

  deleteTask(id: string) {
    const db = getDatabase();
    const tareaRef = ref(db, `tareas/${id}`);
    remove(tareaRef).then(() => {
      console.log('Tarea eliminada con éxito.');
    }).catch((error) => {
      console.error('Error al eliminar la tarea:', error);
    });
  }
}
