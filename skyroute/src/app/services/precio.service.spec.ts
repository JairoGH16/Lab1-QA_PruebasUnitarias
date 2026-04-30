import { TestBed } from '@angular/core/testing';
import { PrecioService } from './precio.service';

describe('PrecioService', () => {
  let service: PrecioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecioService);
  });

  describe('calcularImpuestos(subtotal, paisOrigen, paisDestino)', () => {
    it('debe aplicar la tasa del país cuando el vuelo es doméstico (mismo país origen y destino).', () => {
      // Arrange
      const subtotal = 1000;
      // Act
      const resultado = service.calcularImpuestos(subtotal, 'CR', 'CR');
      // Assert
      expect(resultado).toBe(130);
    });

    it('debe aplicar el promedio de tasas cuando el vuelo es internacional.', () => {
      // Arrange
      const subtotal = 1000;
      // Act
      const resultado = service.calcularImpuestos(subtotal, 'CR', 'US');
      // Assert
      expect(resultado).toBe(102.5);
    });

    it('debe usar 0% para un país no registrado en la lista de impuestos.', () => {
      // Arrange
      const subtotal = 1000;
      // Act
      const resultado = service.calcularImpuestos(subtotal, 'CR', 'XX');
      // Assert
      expect(resultado).toBe(65);
    });
  });

  describe('convertirMoneda(monto, monedaDestino)', () => {
    it('debe convertir correctamente el monto a una moneda soportada.', () => {
      // Arrange
      const monto = 100;
      // Act
      const resultado = service.convertirMoneda(monto, 'EUR');
      // Assert
      expect(resultado).toBe(92);
    });

    it('debe retornar el monto original cuando la moneda de destino no está soportada.', () => {
      // Arrange
      const monto = 100;
      // Act
      const resultado = service.convertirMoneda(monto, 'GBP');
      // Assert
      expect(resultado).toBe(100);
    });
  });

  describe('evaluarOferta(precios, precioObjetivo)', () => {
    it('debe retornar "excelente" cuando el precio es significativamente menor al promedio.', () => {
      // Arrange
      const precios = [500, 600, 700];
      const precioObjetivo = 400;
      // Act
      const resultado = service.evaluarOferta(precios, precioObjetivo);
      // Assert
      expect(resultado).toBe('excelente');
    });

    it('debe retornar "sin referencia" cuando el arreglo de precios de referencia está vacío.', () => {
      // Arrange
      const precios: number[] = [];
      const precioObjetivo = 400;
      // Act
      const resultado = service.evaluarOferta(precios, precioObjetivo);
      // Assert
      expect(resultado).toBe('sin referencia');
    });
  });

});
