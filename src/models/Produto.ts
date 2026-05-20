
import type { ReactNode } from "react";
import type Categoria from "./Categoria";
import type Usuario from "./Usuario";

export default interface Produto {
    titulo: ReactNode;
    texto: ReactNode;
    tema: never;
    data: string | number | Date;
    id: number;
    nome: string;      
    descricao: string;   
    preco: number;       
    foto: string;        
    categoria: Categoria | null; 
    usuario: Usuario | null;     
}