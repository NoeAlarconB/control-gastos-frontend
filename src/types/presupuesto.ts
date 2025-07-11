export interface Presupuesto {
    idPresupuesto: number;
    idUsuario: number;
    idCategoria: number;
    montoMaximo: number;
    mes: number;
    anio: number;
    estadoAuditoria: string | null;
    fechaCreacion: Date | null;
    fechaActualizacion: Date | null;

    nombreCategoria?: string;
}
