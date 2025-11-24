import { NextResponse } from "next/server";

// Array que vai guardar os livros do usuário temporariamente
export let livrosDoacao: any[] = [];

// GET → retorna todos os livros do usuário
export async function GET() {
  return NextResponse.json(livrosDoacao);
}

// POST → cadastra um novo livro
export async function POST(req: Request) {
  const body = await req.json();
  const newId = livrosDoacao.length ? Math.max(...livrosDoacao.map(l => l.id)) + 1 : 1;
  const novoLivro = { id: newId, ...body };
  livrosDoacao.push(novoLivro);
  return NextResponse.json(novoLivro, { status: 201 });
}
