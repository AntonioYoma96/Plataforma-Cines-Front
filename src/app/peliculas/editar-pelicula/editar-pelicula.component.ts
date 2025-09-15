import { Component, Input, numberAttribute } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas.interface';
import { FormularioPeliculasComponent } from "../formulario-peliculas/formulario-peliculas.component";
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo.interface';
import { actorAutoCompleteDTO } from '../../actores/actores.interface';

@Component({
  selector: 'app-editar-pelicula',
  imports: [FormularioPeliculasComponent],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css'
})
export class EditarPeliculaComponent {

  @Input({transform: numberAttribute})
  id!:number;

  pelicula: PeliculaDTO = {id: 1, titulo: 'Spider-Man', trailer: 'ABC', fechaLanzamiento: new Date('2018-07-25'), poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Palace_Theatre_at_Dusk_2.jpg/330px-Palace_Theatre_at_Dusk_2.jpg'}

  generosSeleccionados: SelectorMultipleDTO[] = [
    {llave: 2, valor: 'Accióm'},
  ];

  generosNoSeleccionados: SelectorMultipleDTO[] = [
    {llave: 1, valor: 'Drama'},
    {llave: 3, valor: 'Comedia'},
  ];

  cinesSeleccionados: SelectorMultipleDTO[] = [
    {llave: 2, valor: 'Blue Mall'},
  ];

  cinesNoSeleccionados: SelectorMultipleDTO[] = [
    {llave: 1, valor: 'Agora Mall'},
    {llave: 3, valor: 'Acrópolis'},
  ];

  actoresSeleccionados: actorAutoCompleteDTO[] = [
    {id: 2, nombre: 'Tom Hanks', personaje: 'Forres Gump', foto: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Tom_Hanks_at_the_Elvis_Premiere_2022.jpg'},
  ]

  guardarCambios(pelicula: PeliculaCreacionDTO){
    console.log('editando película', pelicula)
  }

}
