export interface Transaccion {
    idTransacciones: number;
    idUsuario: number;
    idCategoria: number;
    idMetodoPago: number;
    idCuenta: number;
    monto: number;
    tipo: 'ingreso' | 'gasto';
    descripcion?: string | null;
    estadoAuditoria: string | null;
    fechaCreacion: Date | null;
    fechaActualizacion: Date | null;

    nombreCategoria?: string;
    tipoCategoria?: string;
    nombreCuenta?: string;
    nombreMetodo?: string;
}
