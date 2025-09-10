import { Component, OnInit } from '@angular/core';
import { ListadoPeliculasComponent } from '../peliculas/listado-peliculas/listado-peliculas.component';

@Component({
  selector: 'app-landing-page',
  imports: [ListadoPeliculasComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{

   ngOnInit(): void {
    setTimeout(() => {

      this.peliculasEnCines = [
        {
          titulo: 'Inside Out 2',
          fechaLanzamiento: new Date(),
          precio: 1400.99,
          poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Palace_Theatre_at_Dusk_2.jpg/330px-Palace_Theatre_at_Dusk_2.jpg'
        },
        {
          titulo: 'Moana 2',
          fechaLanzamiento: new Date('2016-05-03'),
          precio: 300.99,
          poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Palace_Theatre_at_Dusk_2.jpg/330px-Palace_Theatre_at_Dusk_2.jpg'
        }
      ];

      this.peliculasProximosEstrenos = [
        {
          titulo: 'Bad Boys: Ride or Die',
          fechaLanzamiento: new Date('2016-05-03'),
          precio: 300.99,
          poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Palace_Theatre_at_Dusk_2.jpg/330px-Palace_Theatre_at_Dusk_2.jpg'
        },
        {
          titulo: 'Deadpool & Wolverine',
          fechaLanzamiento: new Date('2016-05-03'),
          precio: 300.99,
          poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Palace_Theatre_at_Dusk_2.jpg/330px-Palace_Theatre_at_Dusk_2.jpg'
        },
        {
          titulo: 'Oppenheimer',
          fechaLanzamiento: new Date('2016-05-03'),
          precio: 300.99,
          poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Palace_Theatre_at_Dusk_2.jpg/330px-Palace_Theatre_at_Dusk_2.jpg'
        },
        {
          titulo: 'The Flash',
          fechaLanzamiento: new Date('2016-05-03'),
          precio: 300.99,
          poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Palace_Theatre_at_Dusk_2.jpg/330px-Palace_Theatre_at_Dusk_2.jpg'
        }
      ];
    }, 100);
  }

  peliculasEnCines!: any[];
  peliculasProximosEstrenos!: any[];

}
