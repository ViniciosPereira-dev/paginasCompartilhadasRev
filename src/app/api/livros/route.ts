import { NextResponse } from "next/server";
import { livrosMock } from "../../../data/livros";

function normalizar(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const livros = [...livrosMock];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const buscaRaw = searchParams.get("busca") || "";
  const generoRaw = searchParams.get("genero") || "Todos";

  const busca = normalizar(buscaRaw);
  const genero = normalizar(generoRaw);

  let resultado = livros;

  // ------------ BUSCA POR TODOS OS CAMPOS --------------
  if (busca) {
    resultado = resultado.filter((l) => {
      const titulo = normalizar(l.titulo);
      const autor = normalizar(l.autor);
      const editora = normalizar(l.editora);
      const generoLivro = normalizar(l.genero);

      return (
        titulo.includes(busca) ||
        autor.includes(busca) ||
        editora.includes(busca) ||
        generoLivro.includes(busca)
      );
    });
  }

  if (genero !== "todos") {
    resultado = resultado.filter((l) => normalizar(l.genero) === genero);
  }

  return NextResponse.json(resultado);
}
