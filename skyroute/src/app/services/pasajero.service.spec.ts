import { TestBed } from '@angular/core/testing';
import { PasajeroService } from './pasajero.service';
import { Pasajero } from '../models/pasajero.model';

describe('PasajeroService', () => {
  let service: PasajeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasajeroService);
  });

  //Determina la categoría del pasajero según su edad. Identifiquen los rangos.
  describe(' calcularCategoria(fechaNacimiento)', () => {
    it('Verificar la categoría para cada uno de los 4 rangos de edad definidos.', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  //Valida múltiples reglas sobre un pasajero. Identifiquen las reglas de validación (mínimo 8).
  describe('validarPasajero(pasajero)', () => {
    it('Verificar que un pasajero con todos los datos correctos pasa la validación.', () => {
      // Arrange
      // Act
      // Assert
    });
    it(' Verificar que falla cuando el nombre este vacío.', () => {
      // Arrange
      // Act
      // Assert
    });
    it('Verificar que falla cuando el pasaporte no cumple el formato requerido.', () => {
      // Arrange
      // Act
      // Assert
    });
    it('Verificar que falla cuando el email es invalido.', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  //Retorna los beneficios según el nivel de membresía frecuente del pasajero.
  describe('obtenerBeneficiosFrecuente(pasajero)', () => {
    it('Verificar los beneficios de un pasajero con nivel alto de membresía.', () => {
      // Arrange
      // Act
      // Assert
    });
    it(' Verificar los beneficios de un pasajero sin membresía.', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  //Calcula las millas que gana un pasajero por un vuelo.
  describe(' calcularMillasGanadas(duracionMinutos, clase, nivelFrecuente)', () => {
    it('Verificar el cálculo básico de millas para un vuelo en clase económica sin membresía.', () => {
      // Arrange
      // Act
      // Assert
    });
  });

});