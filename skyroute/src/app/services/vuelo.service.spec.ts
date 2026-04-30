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
      const vuelo = { duracionMinutos: 120 } as Vuelo;
      // Act
      const resultado = service.clasificarDuracion(vuelo);
      // Assert
      expect(resultado).toBe('corto');
    });

    it('Verificar el comportamiento en un valor frontera (donde cambia de categoría).', () => {
      // Arrange
      // 180 minutos exactos es un valor frontera y ya debería ser medio.
      const vuelo = { duracionMinutos: 180 } as Vuelo;
      // Act
      const resultado = service.clasificarDuracion(vuelo);
      // Assert
      expect(resultado).toBe('medio');
    });

    it('Verificar otra frontera diferente.', () => {
      // Arrange
      // 360 minutos exactos es un valor frontera y debería ser medio.
      const vuelo = { duracionMinutos: 360 } as Vuelo;
      // Act
      const resultado = service.clasificarDuracion(vuelo);
      // Assert
      expect(resultado).toBe('medio');
    });

    it('Verificar la clasificación de un vuelo con duración muy larga.', () => {
      // Arrange
      // Más de 600 minutos debería ser ultra_largo
      const vuelo = { duracionMinutos: 800 } as Vuelo;
      // Act
      const resultado = service.clasificarDuracion(vuelo);
      // Assert
      expect(resultado).toBe('ultra_largo');
    });
  });

  //Convierte minutos a formato legible de horas y minutos.
  describe('formatearDuracion(minutos)', () => {
    it('Verificar el formato cuando hay horas y minutos.', () => {
      // Arrange
      const minutos = 330;
      // Act
      const resultado = service.formatearDuracion(minutos);
      // Assert
      expect(resultado).toBe('5h 30m');
    });

    it('Verificar el formato cuando solo hay minutos (menos de 1 hora).', () => {
      // Arrange
      const minutos = 45;
      // Act
      const resultado = service.formatearDuracion(minutos);
      // Assert
      expect(resultado).toBe('45m');
    });

    it(' Verificar el formato cuando la duración es exacta en horas.', () => {
      // Arrange
      const minutos = 180;
      // Act
      const resultado = service.formatearDuracion(minutos);
      // Assert
      expect(resultado).toBe('3h');
    });

    it('Verificar el comportamiento con un valor negativo.', () => {
      // Arrange
      const minutos = -30;
      // Act
      const resultado = service.formatearDuracion(minutos);
      // Assert
      expect(resultado).toBe('0m');
    });
  });

  //Calcula el porcentaje de ocupación de un vuelo
  describe('calcularOcupacion(vuelo)', () => {
    it('Verificar que el porcentaje se calcula correctamente con valores conocidos.', () => {
      // Arrange
      // 150 ocupados de 180 totales tiene que ser 83.3%
      const vuelo = { asientosOcupados: 150, asientosTotales: 180 } as Vuelo;
      // Act
      const resultado = service.calcularOcupacion(vuelo);
      // Assert
      expect(resultado).toBe(83.3);
    });

    it('.Verificar el caso especial cuando el vuelo no tiene asientos.', () => {
      // Arrange
      const vuelo = { asientosOcupados: 0, asientosTotales: 0 } as Vuelo;
      // Act
      const resultado = service.calcularOcupacion(vuelo);
      // Assert
      expect(resultado).toBe(0); //para evitar dividir entre 0, debería retornar 0
    });
  });

  //Retorna la cantidad de asientos disponibles para un vuelo
  describe('obtenerAsientosDisponibles(vueloId)', () => {
    it('Verificar que retorna un numero correcto para un vuelo existente.', () => {
      // Arrange
      // Vuelo ID 1: 180 totales, 120 ocupados, deberían haber 60 disponibles
      const vueloId = 1;
      // Act
      const resultado = service.obtenerAsientosDisponibles(vueloId);
      // Assert
      expect(resultado).toBe(60);
    });

    it('Verificar el valor de retorno cuando el vuelo no existe.', () => {
      // Arrange
      const vueloId = 1234;
      // Act
      const resultado = service.obtenerAsientosDisponibles(vueloId);
      // Assert
      expect(resultado).toBe(-1);
    });

    it(' Verificar el valor de retorno cuando el vuelo esta cancelado.', () => {
      // Arrange
      // Vuelo ID 5 tiene estado 'cancelado'
      const vueloId = 5;
      // Act
      const resultado = service.obtenerAsientosDisponibles(vueloId);
      // Assert
      expect(resultado).toBe(0);
    });
  });

  //Busca vuelos filtrando por ciudad origen, destino y fecha.
  describe('buscarVuelos(origen, destino, fecha)', () => {
    it('Verificar que retorna resultados para una ruta existente.', () => {
      // Arrange
      // San José a Miami el 15/04/2026 tiene vuelos ID 1 (programado) y ID 6 (retrasado)
      const origen = 'San José';
      const destino = 'Miami';
      const fecha = new Date(2026, 3, 15);
      // Act
      const resultado = service.buscarVuelos(origen, destino, fecha);
      // Assert
      expect(resultado.length).toBeGreaterThan(0);
      expect(resultado[0].origen).toBe('San José');
      expect(resultado[0].destino).toBe('Miami');
    });

    it('Verificar que retorna un arreglo vacío para una ruta inexistente.', () => {
      // Arrange
      const origen = 'Tokio';
      const destino = 'París';
      const fecha = new Date(2026, 3, 15);
      // Act
      const resultado = service.buscarVuelos(origen, destino, fecha);
      // Assert
      expect(resultado.length).toBe(0);
    });

    it('Verificar que los resultados vienen ordenados correctamente.', () => {
      // Arrange
      // San José a Miami el 15/04: ID 6 (precioBase 380) y ID 1 (precioBase 450)
      // Deben venir de menor a mayor precio base
      const origen = 'San José';
      const destino = 'Miami';
      const fecha = new Date(2026, 3, 15);
      // Act
      const resultado = service.buscarVuelos(origen, destino, fecha);
      // Assert
      expect(resultado.length).toBe(2);
      expect(resultado[0].precioBase).toBeLessThanOrEqual(resultado[1].precioBase);
    });
  });

  //Valida si dos vuelos pueden conectarse. Identifiquen todas las reglas de validación.
  describe('validarConexion(vuelo1, vuelo2)', () => {
    it('Verificar una conexión valida entre dos vuelos compatibles.', () => {
      // Arrange
      // Vuelo ID 1: San José hacia Miami, llega 15/04 a las 11:30
      // Vuelo ID 3: Miami hacia Nueva York, sale 15/04 a las 14:00
      // la diferencia es de 150 min, está bien dentro del mínimo que es de 90 y el máximo que es de 720
      const vuelo1 = service.buscarPorId(1)!;
      const vuelo2 = service.buscarPorId(3)!;
      // Act
      const resultado = service.validarConexion(vuelo1, vuelo2);
      // Assert
      expect(resultado.valida).toBeTrue();
      expect(resultado.razon).toBe('Conexión válida');
    });

    it('Verificar que se rechaza cuando las ciudades no coinciden.', () => {
      // Arrange
      // Vuelo ID 1 llega a Miami pero Vuelo ID 4 sale de San José
      const vuelo1 = service.buscarPorId(1)!;
      const vuelo2 = service.buscarPorId(4)!;
      // Act
      const resultado = service.validarConexion(vuelo1, vuelo2);
      // Assert
      expect(resultado.valida).toBeFalse();
      expect(resultado.razon).toContain('no coincide con origen');
    });
  });

});