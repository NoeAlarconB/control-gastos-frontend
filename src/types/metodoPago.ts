export interface MetodoPago {
    idMetodoPago?: number;
    idUsuario: number;
    nombre: string;
    estadoAuditoria: string | null;
    fechaCreacion: Date | null;
    fechaActualizacion: Date | null;
}
