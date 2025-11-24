import { NextResponse } from "next/server";
import { instituicoesMock } from "@/src/data/instituicoes";

// GET: retorna todas as instituições ou filtra por cidade/estado via query
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cidade = searchParams.get("cidade");
  const estado = searchParams.get("estado");

  let resultado = instituicoesMock;

  if (cidade) {
    resultado = resultado.filter(
      (i) => i.cidade.toLowerCase().trim() === cidade.toLowerCase().trim()
    );
  }

  if (estado) {
    resultado = resultado.filter(
      (i) => i.estado.toLowerCase().trim() === estado.toLowerCase().trim()
    );
  }

  return NextResponse.json(resultado);
}