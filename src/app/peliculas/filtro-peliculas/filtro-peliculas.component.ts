import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ListadoPeliculasComponent } from "../listado-peliculas/listado-peliculas.component";
import { FiltroPeliculas } from './filtroPelicula.interface';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatCheckboxModule, ListadoPeliculasComponent],
  templateUrl: './filtro-peliculas.component.html',
  styleUrl: './filtro-peliculas.component.css'
})
export class FiltroPeliculasComponent implements OnInit{

  ngOnInit(): void {
    this.leerValoresURL();
    this.buscarPeliculas(this.form.value as FiltroPeliculas)
    this.form.valueChanges.subscribe(valores => {
      this.peliculas = this.peliculasOriginal;
      console.log(valores);
      this.buscarPeliculas(valores as FiltroPeliculas);
      this.escribirParametrosBusquedaEnURL(valores as FiltroPeliculas)
    })
  }

  // Filtra las películas y ignorando mayúsulas/minúsculas
  buscarPeliculas(valores: FiltroPeliculas){
    if (valores.titulo){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.toLowerCase().includes(valores.titulo.toLocaleLowerCase()));
    }

    if (valores.generoId !== 0){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoId) !== -1);
    }

    if (valores.proximosEstrenos){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.proximosEstrenos);
    }

    if (valores.enCines){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines);
    }
  }

  escribirParametrosBusquedaEnURL(valores: FiltroPeliculas){
    let queryStrings = [];

    if (valores.titulo){
      queryStrings.push(`titulo=${encodeURIComponent(valores.titulo)}`);
    }

    if (valores.generoId !== 0){
      queryStrings.push(`generoId=${valores.generoId}`);
    }

    if (valores.proximosEstrenos){
      queryStrings.push(`proximosEstrenos=${valores.proximosEstrenos}`);
    }

    if (valores.enCines){
      queryStrings.push(`enCines=${valores.enCines}`);
    }

    this.location.replaceState('peliculas/filtrar', queryStrings.join('&'));
  }

  leerValoresURL(){
    this.activatedRoute.queryParams.subscribe((params:any) => {
      var objeto: any = {}

      if(params.titulo){
        objeto.titulo = params.titulo;
      }
      if(params.generoId){
        objeto.generoId = Number(params.titulo);
      }
      if(params.proximosEstrenos){
        objeto.proximosEstrenos = params.proximosEstrenos;
      }
      if(params.enCines){
        objeto.enCines = params.enCines;
      }

      this.form.patchValue(objeto)
    })
  }

  limpiar(){
    this.form.patchValue({titulo: '', generoId: 0, proximosEstrenos: false, enCines: false})
  }

  private formBuilder = inject(FormBuilder);
  private location = inject(Location);
  private activatedRoute = inject(ActivatedRoute);

  form = this.formBuilder.group({
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false
  })

  generos = [
    {id: 1, nombre: 'Drama'},
    {id: 2, nombre: 'Acción'},
    {id: 3, nombre: 'Comedia'}
  ]

  peliculasOriginal = [
  {
    titulo: 'Inside Out 2',
    fechaLanzamiento: new Date(),
    precio: 1400.99,
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Palace_Theatre_at_Dusk_2.jpg/330px-Palace_Theatre_at_Dusk_2.jpg',
    generos: [1,2,3],
    enCines: true,
    proximosEstrenos: false
  },
  {
    titulo: 'Moana 2',
    fechaLanzamiento: new Date('2016-05-03'),
    precio: 300.99,
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Palace_Theatre_at_Dusk_2.jpg/330px-Palace_Theatre_at_Dusk_2.jpg',
    generos: [3],
    enCines: false,
    proximosEstrenos: true
  },
  {
    titulo: 'Bad Boys: Ride or Die',
    fechaLanzamiento: new Date('2016-05-03'),
    precio: 300.99,
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Palace_Theatre_at_Dusk_2.jpg/330px-Palace_Theatre_at_Dusk_2.jpg',
    generos: [1],
    enCines: false,
    proximosEstrenos: false
  },
  {
    titulo: 'Deadpool & Wolverine',
    fechaLanzamiento: new Date('2016-05-03'),
    precio: 300.99,
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Palace_Theatre_at_Dusk_2.jpg/330px-Palace_Theatre_at_Dusk_2.jpg',
    generos: [],
    enCines: true,
    proximosEstrenos: false
  },
  {
    titulo: 'Oppenheimer',
    fechaLanzamiento: new Date('2016-05-03'),
    precio: 300.99,
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Palace_Theatre_at_Dusk_2.jpg/330px-Palace_Theatre_at_Dusk_2.jpg',
    generos: [1,3],
    enCines: false,
    proximosEstrenos: true
  },
  {
    titulo: 'The Flash',
    fechaLanzamiento: new Date('2016-05-03'),
    precio: 300.99,
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Palace_Theatre_at_Dusk_2.jpg/330px-Palace_Theatre_at_Dusk_2.jpg',
    generos: [2,3],
    enCines: false,
    proximosEstrenos: false
  }
];

peliculas = this.peliculasOriginal;

}
