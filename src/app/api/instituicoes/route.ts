// src/app/api/instituicoes/route.ts
import { NextResponse } from "next/server";

const instituicoesMock = [
  {
    id: 1,
    nome: "Biblioteca Esperança",
    cidade: "Votorantim",
    estado: "SP",
    distancia: "1.2 km",
    descricao: "Promove acesso gratuito à leitura e realiza oficinas literárias para crianças.",
    imagem: "/imagens/card1.jpg",
  },
  {
    id: 2,
    nome: "Casa do Saber",
    cidade: "Votorantim",
    estado: "SP",
    distancia: "2.3 km",
    descricao: "Espaço comunitário com troca de livros, rodas de leitura e incentivo à escrita.",
    imagem: "/imagens/card2.jpg",
  },
  {
    id: 3,
    nome: "Centro Cultural Páginas Vivas",
    cidade: "Votorantim",
    estado: "SP",
    distancia: "3.1 km",
    descricao: "Desenvolve projetos de leitura e conta com um acervo literário aberto ao público.",
    imagem: "/imagens/card3.jpg",
  },
];

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

