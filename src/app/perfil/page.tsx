"use client";

import { useState } from "react";
import { Avatar, Button, Card, CardBody, Typography } from "@material-tailwind/react";
import {
  HandThumbUpIcon,
  ChatBubbleOvalLeftIcon,
  ArrowUpTrayIcon,
  UserIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export default function PerfilPage() {
  const [tab, setTab] = useState("posts");

  const posts = [
    {
      title: "📖 Doação para escola comunitária",
      text: "Fiz uma nova doação de livros para uma escola no interior de SP.",
      date: "25/05/2025",
    },
    {
      title: "⭐ Livro recomendado: “A Menina que Roubava Livros”",
      text: "História emocionante e leitura envolvente. Recomendo fortemente!",
      date: "22/05/2025",
    },
    {
      title: "🗨️ Discussão: Leitura digital vs. física",
      text: "Eu gosto do toque do papel, mas o Kindle tem me ajudado a ler mais rápido.",
      date: "20/05/2025",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* ===== HEADER DO PERFIL ===== */}
      <div className="pt-28 text-center bg-white border-b px-4 pb-6">
        <Avatar
          src="https://randomuser.me/api/portraits/men/75.jpg"
          size="xxl"
          className="mx-auto"
        />

        <Typography variant="h5" className="mt-4">
          João Silva
        </Typography>

        <Typography className="text-gray-600">
          Apaixonado por livros 📚 | Sempre aprendendo e compartilhando.
        </Typography>

        <div className="flex justify-center gap-6 mt-4 text-gray-700">
          <span><strong>54</strong> postagens</span>
          <span><strong>12</strong> seguidores</span>
          <span><strong>8</strong> seguindo</span>
        </div>

        <Button variant="outlined" size="sm" className="mt-4">
          Editar Perfil
        </Button>
      </div>

      {/* ===== MENU DE ABA ===== */}
      <div className="flex justify-center gap-8 mt-6 mb-6">
        <button
          onClick={() => setTab("posts")}
          className={`flex items-center gap-2 pb-1 ${
            tab === "posts" ? "border-b-2 border-black font-semibold" : "text-gray-600"
          }`}
        >
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          Postagens
        </button>

        <button
          onClick={() => setTab("books")}
          className={`flex items-center gap-2 pb-1 ${
            tab === "books" ? "border-b-2 border-black font-semibold" : "text-gray-600"
          }`}
        >
          <BookOpenIcon className="h-5 w-5" />
          Livros
        </button>

        <button
          onClick={() => setTab("about")}
          className={`flex items-center gap-2 pb-1 ${
            tab === "about" ? "border-b-2 border-black font-semibold" : "text-gray-600"
          }`}
        >
          <UserIcon className="h-5 w-5" />
          Sobre
        </button>
      </div>

      {/* ===== CONTEÚDO DAS ABAS ===== */}
      <div className="max-w-lg mx-auto px-4">
        {/* POSTS */}
        {tab === "posts" && (
          <>
            <Typography variant="h6" className="mb-4">
              Postagens recentes
            </Typography>

            {posts.map((post, i) => (
              <Card key={i} className="mb-4">
                <CardBody>
                  <Typography variant="h6" className="font-bold">
                    {post.title}
                  </Typography>

                  <Typography className="mt-2">{post.text}</Typography>

                  <div className="flex gap-4 mt-4 text-gray-600">
                    <HandThumbUpIcon className="h-5 w-5 cursor-pointer" />
                    <ChatBubbleOvalLeftIcon className="h-5 w-5 cursor-pointer" />
                    <ArrowUpTrayIcon className="h-5 w-5 cursor-pointer" />
                  </div>

                  <Typography className="text-gray-500 text-sm mt-2">
                    Postado em {post.date}
                  </Typography>
                </CardBody>
              </Card>
            ))}
          </>
        )}

        {/* LIVROS */}
        {tab === "books" && (
          <div className="text-center text-gray-600 mt-10">
            <Typography>📚 Nenhum livro cadastrado ainda.</Typography>
          </div>
        )}

        {/* SOBRE */}
        {tab === "about" && (
          <div className="bg-white p-4 rounded-xl shadow">
            <Typography className="text-gray-700 leading-relaxed">
              Olá! Meu nome é João Silva.
              <br />
              Sou apaixonado por leitura, novas ideias e compartilhar conhecimento.
              <br />
              Entusiasta de ficção, história e tecnologia.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
