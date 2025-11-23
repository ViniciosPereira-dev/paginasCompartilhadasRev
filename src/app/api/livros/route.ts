// src/app/api/livros/route.ts
import { NextResponse } from "next/server";
import { livrosMock } from "../../../data/livros";

// copia mutável
const livros = [...livrosMock];

// função para remover acentos e padronizar letras
function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const busca = normalize(searchParams.get("busca") || "");
  const genero = normalize(searchParams.get("genero") || "todos");

  let resultado = livros;

  // 🔎 BUSCA (titulo, autor, genero)
  if (busca) {
    resultado = resultado.filter((l) => {
      const titulo = normalize(l.titulo);
      const autor = normalize(l.autor);
      const generoLivro = normalize(l.genero);

      return (
        titulo.includes(busca) ||
        autor.includes(busca) ||
        generoLivro.includes(busca)
      );
    });
  }

  // 🎭 FILTRO POR GÊNERO
  if (genero !== "todos") {
    resultado = resultado.filter(
      (l) => normalize(l.genero) === genero
    );
  }

  return NextResponse.json(resultado);
}
