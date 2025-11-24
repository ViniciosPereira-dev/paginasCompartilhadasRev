import { NextResponse } from "next/server";
import { livrosMock } from "../../../data/livros";



const livros = [...livrosMock]; 

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const busca = searchParams.get("busca")?.toLowerCase() || "";
  const genero = searchParams.get("genero") || "Todos";

  let resultado = livros;

  if (busca) {
    resultado = resultado.filter(
      (l) =>
        l.titulo.toLowerCase().includes(busca) ||
        l.autor.toLowerCase().includes(busca)
    );
  }

  if (genero !== "Todos") {
    resultado = resultado.filter((l) => l.genero === genero);
  }

  return NextResponse.json(resultado);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newId = livros.length ? Math.max(...livros.map((l) => l.id)) + 1 : 1;
  const novoLivro = { id: newId, ...body };
  livros.push(novoLivro);
  return NextResponse.json(novoLivro, { status: 201 });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const index = livros.findIndex((l) => l.id === body.id);
  if (index === -1)
    return NextResponse.json({ error: "Livro não encontrado" }, { status: 404 });

  livros[index] = { ...livros[index], ...body };
  return NextResponse.json(livros[index]);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  const index = livros.findIndex((l) => l.id === id);
  if (index === -1)
    return NextResponse.json({ error: "Livro não encontrado" }, { status: 404 });

  const removed = livros.splice(index, 1);
  return NextResponse.json(removed[0]);
}