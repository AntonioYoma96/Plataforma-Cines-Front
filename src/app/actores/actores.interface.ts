// Para editar el actor
export interface ActorDTO {
  id: number;
  nombre: string;
  fechaNacimiento: Date;
  foto?: string;
}

// Para crear el actot
export interface ActorCreacionDTO {
  nombre: string;
  fechaNacimiento: Date;
  foto?: File;
}
