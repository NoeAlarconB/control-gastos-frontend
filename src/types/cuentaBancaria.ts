export interface CuentaBancaria {
    idCuenta: number;
    nombre: string;
    saldo: number;
    estadoAuditoria: string | null;
    fechaCreacion: string | null;
    fechaActualizacion: string | null;
}
