import { TestBed } from '@angular/core/testing';
import { PrecioService } from './precio.service';

describe('PrecioService', () => {
  let service: PrecioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecioService);
  });

  //Calcula los impuestos según los países de origen y destino.
  describe('calcularImpuestos(subtotal, paisOrigen, paisDestino)', () => {
    it('Verificar el cálculo para un vuelo domestico (mismo país origen y destino).', () => {
      // Arrange
      // Act
      // Assert
    });
    it('Verificar el cálculo para un vuelo internacional (países diferentes).', () => {
      // Arrange
      // Act
      // Assert
    });
    it('Verificar el comportamiento cuando un país no está registrado.', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  //Convierte un monto de USD a otra moneda.
  describe('convertirMoneda(monto, monedaDestino)', () => {
    it('Verificar la conversión a una moneda soportada.', () => {
      // Arrange
      // Act
      // Assert
    });
    it(' Verificar el comportamiento con una moneda no soportada.', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  //Evaluar si un precio es buena oferta comparándolo con precios de referencia.
  describe('evaluarOferta(precios, precioObjetivo)', () => {
    it('Verificar la clasificación cuando el precio es significativamente menor al promedio.', () => {
      // Arrange
      // Act
      // Assert
    });
    it('Verificar el comportamiento cuando el arreglo de referencia está vacío.', () => {
      // Arrange
      // Act
      // Assert
    });
  });

});