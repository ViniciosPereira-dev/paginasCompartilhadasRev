// src/app/api/livrosDoacao/route.ts
import { NextResponse } from "next/server";
import { livrosDB, idCounter, createLivro, listLivros, updateLivro, deleteLivro } from "../../../data/db";

export async function GET() {
  return NextResponse.json(listLivros());
}

export async function POST(req: Request) {
  const data = await req.json();
  const novo = createLivro(data);
  return NextResponse.json(novo, { status: 201 });
}

export async function PUT(req: Request) {
  const { id, ...data } = await req.json();
  updateLivro(Number(id), data);
  return NextResponse.json({ message: "Atualizado" });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  deleteLivro(Number(id));
  return NextResponse.json({ message: "Deletado" });
}
