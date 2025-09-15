import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { actorAutoCompleteDTO, ActorDTO } from '../actores.interface';

@Component({
  selector: 'app-autocomplete-actores',
  imports: [MatAutocompleteModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, FormsModule, MatTableModule, MatInputModule, DragDropModule],
  templateUrl: './autocomplete-actores.component.html',
  styleUrl: './autocomplete-actores.component.css'
})
export class AutocompleteActoresComponent {

  control = new FormControl();

  actores: actorAutoCompleteDTO[] = [
    {id: 1, nombre: 'Tom Holland', personaje: '', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Tom_Holland_during_pro-am_Wentworth_golf_club_2023-2.jpg/330px-Tom_Holland_during_pro-am_Wentworth_golf_club_2023-2.jpg'},
    {id: 2, nombre: 'Tom Hanks', personaje: '', foto: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Tom_Hanks_at_the_Elvis_Premiere_2022.jpg'},
    {id: 3, nombre: 'Samuel L. Jackson', personaje: '', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/SamuelLJackson.jpg/500px-SamuelLJackson.jpg'},
  ]

  @Input({required: true})
  actoresSeleccionados: actorAutoCompleteDTO[] = [];

  columnasAMostrar = ['imagen', 'nombre', 'personaje', 'acciones'];

  @ViewChild(MatTable) table!: MatTable<actorAutoCompleteDTO>;

  actorSeleccionado(event: MatAutocompleteSelectedEvent){
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');

    if (this.table != undefined) {
      this.table.renderRows();
    }
  }

  finalizarArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.actoresSeleccionados.findIndex(actor => actor === event.item.data);
    moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex);
    this.table.renderRows()
  }

  eliminar(actor: actorAutoCompleteDTO){
    const indice = this.actoresSeleccionados.findIndex((a:actorAutoCompleteDTO) => a.id === actor.id);
    this.actoresSeleccionados.splice(indice, 1);
    this.table.renderRows()
  }

}
