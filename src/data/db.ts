export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  editora: string;
  genero: string;
  ano: string;
  sinopse: string;
  observacoes: string;
  imagem?: string;
}

export let livrosDB: Livro[] = [];
export let idCounter = 1;

export function createLivro(data: Omit<Livro, "id">) {
  const novo = { id: idCounter++, ...data };
  livrosDB.push(novo);
  return novo;
}

export function listLivros() {
  return livrosDB;
}

export function updateLivro(id: number, data: Partial<Livro>) {
  livrosDB = livrosDB.map(l => (l.id === id ? { ...l, ...data } : l));
}

export function deleteLivro(id: number) {
  livrosDB = livrosDB.filter(l => l.id !== id);
}
