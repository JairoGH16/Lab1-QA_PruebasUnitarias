import { TestBed } from '@angular/core/testing';
import { VueloService } from './vuelo.service';
import { Vuelo } from '../models/vuelo.model';

describe('VueloService', () => {
  let service: VueloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VueloService);
  });

  //Clasifica un vuelo según su duración en minutos. Identifiquen las categorías y sus rangos.
  describe('clasificarDuracion(vuelo)', () => {
    it('Verificar la clasificación de un vuelo con duración corta.', () => {
      // Arrange
      // Act
      // Assert
    });
  });
    it('Verificar el comportamiento en un valor frontera (donde cambia de categoría).', () => {
      // Arrange
      // Act
      // Assert
    });
    it('Verificar otra frontera diferente.', () => {
      // Arrange
      // Act
      // Assert
    });
    it('Verificar la clasificación de un vuelo con duración muy larga.', () => {
      // Arrange
      // Act
      // Assert
    });


  //Convierte minutos a formato legible de horas y minutos.
  describe('formatearDuracion(minutos)', () => {
    it('Verificar el formato cuando hay horas y minutos.', () => {
      // Arrange
      // Act
      // Assert
    });
    it('Verificar el formato cuando solo hay minutos (menos de 1 hora).', () => {
      // Arrange
      // Act
      // Assert
    });
    it(' Verificar el formato cuando la duración es exacta en horas.', () => {
      // Arrange
      // Act
      // Assert
    });
    it('Verificar el comportamiento con un valor negativo.', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  //Calcula el porcentaje de ocupación de un vuelo
  describe('calcularOcupacion(vuelo)', () => {
    it('Verificar que el porcentaje se calcula correctamente con valores conocidos.', () => {
      // Arrange
      // Act
      // Assert
    });
    it('.Verificar el caso especial cuando el vuelo no tiene asientos.', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  //Retorna la cantidad de asientos disponibles para un vuelo
  describe('obtenerAsientosDisponibles(vueloId)', () => {
    it('Verificar que retorna un numero correcto para un vuelo existente.', () => {
      // Arrange
      // Act
      // Assert
    });
    it('Verificar el valor de retorno cuando el vuelo no existe.', () => {
      // Arrange
      // Act
      // Assert
    });
    it(' Verificar el valor de retorno cuando el vuelo esta cancelado.', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  //Busca vuelos filtrando por ciudad origen, destino y fecha.
  describe('buscarVuelos(origen, destino, fecha)', () => {
    it('Verificar que retorna resultados para una ruta existente.', () => {
      // Arrange
      // Act
      // Assert
    });
    it('Verificar que retorna un arreglo vacío para una ruta inexistente.', () => {
      // Arrange
      // Act
      // Assert
    });
    it('Verificar que los resultados vienen ordenados correctamente.', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  //Valida si dos vuelos pueden conectarse. Identifiquen todas las reglas de validación.
  describe('validarConexion(vuelo1, vuelo2)', () => {
    it('Verificar una conexión valida entre dos vuelos compatibles.', () => {
      // Arrange
      // Act
      // Assert
    });
    it('Verificar que se rechaza cuando las ciudades no coinciden.', () => {
      // Arrange
      // Act
      // Assert
    });
  });

});