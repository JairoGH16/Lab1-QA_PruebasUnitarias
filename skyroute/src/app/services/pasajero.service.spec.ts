// Complejidad Ciclomatica de validarPasajero:
// Decisiones encontradas:
//   if (!pasajero.nombre || ...)                                   -> 2 (if + ||)
//   if (!pasajero.apellido || ...)                                 -> 2 (if + ||)
//   if (!pasaporteRegex.test(...))                                 -> 1 (if)
//   if (!pasajero.email || ...)                                    -> 2 (if + ||)
//   if (partes.length !== 2 || ...)                                -> 2 (if + ||)
//   if (pasajero.fechaNacimiento > new Date())                     -> 1 (if)
//   if (!pasajero.telefono || ...)                                 -> 2 (if + ||)
//   if (!pasajero.contactoEmergencia || ... || ... || ... || ...)  -> 5 (if + 4 * ||)
//   if (categoria === 'infante')                                   -> 1 (if)
//   if (relacion !== 'padre' && relacion !== 'madre')              -> 2 (if + &&)
// Total de decisiones: 20
// CC = 21

import { TestBed } from '@angular/core/testing';
import { PasajeroService } from './pasajero.service';
import { Pasajero } from '../models/pasajero.model';

describe('PasajeroService', () => {
  let service: PasajeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasajeroService);
  });

  describe('calcularCategoria(fechaNacimiento)', () => {
    it('debe retornar "infante" para un pasajero menor de 2 años.', () => {
      // Arrange
      const hoy = new Date();
      const fechaNacimiento = new Date(hoy.getFullYear() - 1, hoy.getMonth(), hoy.getDate());
      // Act
      const resultado = service.calcularCategoria(fechaNacimiento);
      // Assert
      expect(resultado).toBe('infante');
    });

    it('debe retornar "nino" para un pasajero entre 2 y 11 años.', () => {
      // Arrange
      const hoy = new Date();
      const fechaNacimiento = new Date(hoy.getFullYear() - 5, hoy.getMonth(), hoy.getDate());
      // Act
      const resultado = service.calcularCategoria(fechaNacimiento);
      // Assert
      expect(resultado).toBe('nino');
    });

    it('debe retornar "adulto" para un pasajero entre 12 y 64 años.', () => {
      // Arrange
      const hoy = new Date();
      const fechaNacimiento = new Date(hoy.getFullYear() - 30, hoy.getMonth(), hoy.getDate());
      // Act
      const resultado = service.calcularCategoria(fechaNacimiento);
      // Assert
      expect(resultado).toBe('adulto');
    });

    it('debe retornar "adulto_mayor" para un pasajero de 65 años o más.', () => {
      // Arrange
      const hoy = new Date();
      const fechaNacimiento = new Date(hoy.getFullYear() - 70, hoy.getMonth(), hoy.getDate());
      // Act
      const resultado = service.calcularCategoria(fechaNacimiento);
      // Assert
      expect(resultado).toBe('adulto_mayor');
    });
  });

  describe('validarPasajero(pasajero)', () => {
    it('debe pasar la validación cuando el pasajero tiene todos los datos correctos.', () => {
      // Arrange
      const pasajero: Pasajero = {
        id: 99, nombre: 'Juan', apellido: 'Perez', pasaporte: 'AB1234567',
        nacionalidad: 'CR', fechaNacimiento: new Date('1990-01-01'), email: 'juan@test.com',
        telefono: '+506 8888-0001', genero: 'M', miembroFrecuente: false,
        nivelFrecuente: 'ninguno', millasAcumuladas: 0, necesidadesEspeciales: [],
        visasVigentes: [], contactoEmergencia: { nombre: 'Ana', telefono: '+506 8888-0002', relacion: 'esposa' }
      };
      // Act
      const resultado = service.validarPasajero(pasajero);
      // Assert
      expect(resultado.valido).toBeTrue();
      expect(resultado.errores.length).toBe(0);
    });

    it('debe fallar la validación cuando el nombre está vacío.', () => {
      // Arrange
      const pasajero: Pasajero = {
        id: 99, nombre: '', apellido: 'Perez', pasaporte: 'AB1234567',
        nacionalidad: 'CR', fechaNacimiento: new Date('1990-01-01'), email: 'juan@test.com',
        telefono: '+506 8888-0001', genero: 'M', miembroFrecuente: false,
        nivelFrecuente: 'ninguno', millasAcumuladas: 0, necesidadesEspeciales: [],
        visasVigentes: [], contactoEmergencia: { nombre: 'Ana', telefono: '+506 8888-0002', relacion: 'esposa' }
      };
      // Act
      const resultado = service.validarPasajero(pasajero);
      // Assert
      expect(resultado.valido).toBeFalse();
      expect(resultado.errores).toContain('El nombre es obligatorio');
    });

    it('debe fallar la validación cuando el pasaporte no cumple el formato requerido.', () => {
      // Arrange
      const pasajero: Pasajero = {
        id: 99, nombre: 'Juan', apellido: 'Perez', pasaporte: '12345678',
        nacionalidad: 'CR', fechaNacimiento: new Date('1990-01-01'), email: 'juan@test.com',
        telefono: '+506 8888-0001', genero: 'M', miembroFrecuente: false,
        nivelFrecuente: 'ninguno', millasAcumuladas: 0, necesidadesEspeciales: [],
        visasVigentes: [], contactoEmergencia: { nombre: 'Ana', telefono: '+506 8888-0002', relacion: 'esposa' }
      };
      // Act
      const resultado = service.validarPasajero(pasajero);
      // Assert
      expect(resultado.valido).toBeFalse();
      expect(resultado.errores).toContain('El pasaporte debe tener formato válido (2 letras mayúsculas + 7 dígitos)');
    });

    it('debe fallar la validación cuando el email es inválido.', () => {
      // Arrange
      const pasajero: Pasajero = {
        id: 99, nombre: 'Juan', apellido: 'Perez', pasaporte: 'AB1234567',
        nacionalidad: 'CR', fechaNacimiento: new Date('1990-01-01'), email: 'invalido',
        telefono: '+506 8888-0001', genero: 'M', miembroFrecuente: false,
        nivelFrecuente: 'ninguno', millasAcumuladas: 0, necesidadesEspeciales: [],
        visasVigentes: [], contactoEmergencia: { nombre: 'Ana', telefono: '+506 8888-0002', relacion: 'esposa' }
      };
      // Act
      const resultado = service.validarPasajero(pasajero);
      // Assert
      expect(resultado.valido).toBeFalse();
      expect(resultado.errores).toContain('El email debe contener @');
    });
  });

  describe('obtenerBeneficiosFrecuente(pasajero)', () => {
    it('debe retornar los beneficios completos para un pasajero con nivel platino.', () => {
      // Arrange
      const pasajero = { miembroFrecuente: true, nivelFrecuente: 'platino' } as Pasajero;
      // Act
      const resultado = service.obtenerBeneficiosFrecuente(pasajero);
      // Assert
      expect(resultado).toEqual({ descuento: 25, equipajeExtra: 23, salaVip: true, prioridadAbordaje: true });
    });

    it('debe retornar todos los beneficios en cero para un pasajero sin membresía.', () => {
      // Arrange
      const pasajero = { miembroFrecuente: false, nivelFrecuente: 'ninguno' } as Pasajero;
      // Act
      const resultado = service.obtenerBeneficiosFrecuente(pasajero);
      // Assert
      expect(resultado).toEqual({ descuento: 0, equipajeExtra: 0, salaVip: false, prioridadAbordaje: false });
    });
  });

  describe('calcularMillasGanadas(duracionMinutos, clase, nivelFrecuente)', () => {
    it('debe calcular correctamente 1 milla por minuto en clase económica sin membresía.', () => {
      // Arrange
      const duracion = 300;
      const clase = 'economica';
      const nivel = 'ninguno';
      // Act
      const resultado = service.calcularMillasGanadas(duracion, clase, nivel);
      // Assert
      // 300 minutos * 1 (económica) * (1 + 0 bonus) = 300 millas
      expect(resultado).toBe(300);
    });
  });

});
