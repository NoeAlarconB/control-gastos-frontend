export interface Categoria{
    idCategoria: number;
    nombre: string;
    tipo: string;
    estadoAuditoria: string | null;
    fechaCreacion: string | null;
    fechaActualizacion: string | null;
}