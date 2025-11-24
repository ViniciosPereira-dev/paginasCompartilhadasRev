import { NextResponse } from "next/server";

let livros: any[] = []; // Aqui ficam os livros cadastrados temporariamente

// GET → retorna todos os livros do usuário
export async function GET() {
  return NextResponse.json(livros);
}

// POST → cadastra um novo livro
export async function POST(req: Request) {
  const body = await req.json();
  const newId = livros.length ? Math.max(...livros.map(l => l.id)) + 1 : 1;
  const novoLivro = { id: newId, disponivel: true, ...body };
  livros.push(novoLivro);
  return NextResponse.json(novoLivro, { status: 201 });
}

// PUT → atualiza um livro
export async function PUT(req: Request) {
  const body = await req.json();
  const index = livros.findIndex(l => l.id === body.id);
  if (index === -1) {
    return NextResponse.json({ erro: "Livro não encontrado" }, { status: 404 });
  }
  livros[index] = { ...livros[index], ...body };
  return NextResponse.json(livros[index]);
}

// DELETE → remove um livro
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  const index = livros.findIndex(l => l.id === id);
  if (index === -1) {
    return NextResponse.json({ erro: "Livro não encontrado" }, { status: 404 });
  }
  const removido = livros.splice(index, 1)[0];
  return NextResponse.json(removido);
}

