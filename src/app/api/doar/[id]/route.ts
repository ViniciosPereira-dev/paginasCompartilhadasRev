import { NextResponse } from "next/server";
import { livrosDoacao } from "../route"; // Importa o array compartilhado

// PUT → atualiza um livro
export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = Number(url.pathname.split("/").pop()); // pega o id da URL

  const body = await req.json();
  const index = livrosDoacao.findIndex(l => l.id === id);

  if (index === -1) {
    return NextResponse.json({ erro: "Livro não encontrado" }, { status: 404 });
  }

  livrosDoacao[index] = { ...livrosDoacao[index], ...body };
  return NextResponse.json(livrosDoacao[index]);
}

// DELETE → remove um livro
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = Number(url.pathname.split("/").pop());

  const index = livrosDoacao.findIndex(l => l.id === id);
  if (index === -1) {
    return NextResponse.json({ erro: "Livro não encontrado" }, { status: 404 });
  }

  const removido = livrosDoacao.splice(index, 1)[0];
  return NextResponse.json(removido);
}
