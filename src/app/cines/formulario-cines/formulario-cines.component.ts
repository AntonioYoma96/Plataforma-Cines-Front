import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { CineCreacionDTO } from '../cines.interface';
import { MapaComponent } from "../../compartidos/componentes/mapa/mapa.component";
import { Coordenada } from '../../compartidos/componentes/mapa/coordenada.interface';

@Component({
  selector: 'app-formulario-cines',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink, MapaComponent],
  templateUrl: './formulario-cines.component.html',
  styleUrl: './formulario-cines.component.css'
})
export class FormularioCinesComponent implements OnInit {

  // Si se pasa un modelo (ej: al editar un cine existente), se rellenan los campos del formulario con esos valores.
  // patchValue copia solo las propiedades que coincidan.
  ngOnInit(): void {
    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
      this.coordenadasIniciales.push({latitud: this.modelo.latitud, longitud: this.modelo.longitud})
    }
  }

  // Permite que el componente padre le pase un modelo (CineCreacionDTO).
  // Sirve, por ejemplo, para editar un cine cargando sus valores en el formulario.
  @Input()
  modelo?: CineCreacionDTO;

  // Permite que este componente emita un evento hacia el padre cuando se envíe el formulario.
  // El padre podrá capturar el cine creado/editado.
  @Output()
  posteoFormulario = new EventEmitter<CineCreacionDTO>();

  coordenadasIniciales: Coordenada[] = [];

  // obtiene el servicio FormBuilder para crear formularios reactivos.
  private formBuilder = inject(FormBuilder);

  // form: se construye con un campo nombre
  form = this.formBuilder.group({
    nombre: ['', {validators: [Validators.required]}],
    latitud: new FormControl<number | null>(null, [Validators.required]),
    longitud: new FormControl<number | null>(null, [Validators.required]),
  })

  // Verifica si el campo nombre tiene errores. Si falta, devuelve un mensaje de error.
  // Sirve para mostrar mensajes en la vista (ej. debajo del input).
  obtenerErrorCampoNombre(): string {
    let nombre = this.form.controls.nombre;

    if (nombre.hasError('required')){
      return "El campo nombre es requerido";
    }

    return "";
  }

  coordenadaSeleccionada(coordenada: Coordenada){
    this.form.patchValue(coordenada);
  }


  // Si el formulario no es válido, no hace nada. Si es válido:
  // Toma el valor del formulario (this.form.value) y lo castea a CineCreacionDTO.
  // Lo emite hacia el padre con posteoFormulario.emit(cine).
  guardarCambios(){
    if (!this.form.valid){
      return;
    }

    const cine = this.form.value as CineCreacionDTO;
    this.posteoFormulario.emit(cine);
  }
}
