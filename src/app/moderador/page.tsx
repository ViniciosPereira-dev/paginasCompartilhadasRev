"use client";

import React, { useState } from "react";

interface Comment {
  id: string;
  user: string;
  text: string;
}

interface Post {
  postId: string;
  user: string;
  postDate: string;
  status: "Pendente" | "Aprovado" | "Rejeitado";
  recommendationTitle: string;
  imageUrl: string;
  description: string;
  comments: Comment[];
}

export default function ModeradorPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      postId: "1",
      user: "@marila_livros",
      postDate: "19/01/2025",
      status: "Pendente",
      recommendationTitle: "Recomende: Dom Casmurro",
      imageUrl: "/imagens/livro1.jpg",
      description:
        "Essa boa indicação para quem adora a ponta de visão da dúvida do Bentinho.",
      comments: [
        { id: "1", user: "@alexandre", text: "Também gostei muito!" },
        { id: "2", user: "@veronica", text: "Dei de presente para o meu pai." },
        { id: "3", user: "@robs", text: "Eu achei confuso..." },
      ],
    },
    {
      postId: "2",
      user: "@ana_livbks",
      postDate: "20/01/2025",
      status: "Aprovado",
      recommendationTitle: "Troca de livros - Harry Potter",
      imageUrl: "/imagens/livro3.webp",
      description:
        "Estou buscando quem queira trocar Harry Potter 2 por outra troca infantil.",
      comments: [
        { id: "1", user: "@tiago", text: "Tenho um livro pra trocar!" },
        { id: "2", user: "@cristiane", text: "Eu tenho também, da quinta edição!" },
      ],
    },
    {
      postId: "3",
      user: "@carolina_leitura",
      postDate: "18/01/2025",
      status: "Rejeitado",
      recommendationTitle: "Dica de leitura - 1984",
      imageUrl: "/imagens/livro2.jpg",
      description:
        "Um clássico distópico que todo mundo deveria ler! Me marcou a importância da liberdade.",
      comments: [{ id: "1", user: "@carlos_backer", text: "Excelente recomendação!" }],
    },
  ]);

  // Ações
  const handleApprove = (id: string) =>
    setPosts((p) =>
      p.map((post) => (post.postId === id ? { ...post, status: "Aprovado" } : post))
    );

  const handleReject = (id: string) =>
    setPosts((p) =>
      p.map((post) => (post.postId === id ? { ...post, status: "Rejeitado" } : post))
    );

  const handleEdit = (id: string) => console.log("Editar", id);
  const handleDelete = (id: string) => setPosts((p) => p.filter((post) => post.postId !== id));

  const handleDeleteComment = (postId: string, commentId: string) => {
    setPosts((p) =>
      p.map((post) =>
        post.postId === postId
          ? { ...post, comments: post.comments.filter((c) => c.id !== commentId) }
          : post
      )
    );
  };

  const pendingCount = posts.filter((p) => p.status === "Pendente").length;
  const approvedCount = posts.filter((p) => p.status === "Aprovado").length;
  const rejectedCount = posts.filter((p) => p.status === "Rejeitado").length;

  const statusColors = {
    Pendente: "bg-yellow-100 border-yellow-400 text-yellow-700",
    Aprovado: "bg-green-100 border-green-400 text-green-700",
    Rejeitado: "bg-red-100 border-red-400 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* STATS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-6xl mx-auto mt-8 px-5">
        <div className="p-6 text-center shadow rounded-lg bg-white">
          <p className="text-4xl font-bold text-indigo-500">{pendingCount}</p>
          <p className="text-xs text-gray-600 uppercase tracking-wide">Pendentes</p>
        </div>
        <div className="p-6 text-center shadow rounded-lg bg-white">
          <p className="text-4xl font-bold text-indigo-500">{approvedCount}</p>
          <p className="text-xs text-gray-600 uppercase tracking-wide">Aprovadas</p>
        </div>
        <div className="p-6 text-center shadow rounded-lg bg-white">
          <p className="text-4xl font-bold text-indigo-500">{rejectedCount}</p>
          <p className="text-xs text-gray-600 uppercase tracking-wide">Rejeitadas</p>
        </div>
      </section>

      {/* POSTS LIST */}
      <main className="max-w-6xl mx-auto px-5 mt-6 flex flex-col gap-6">
        {posts.length ? (
          posts.map((post) => (
            <div
              key={post.postId}
              className={`border rounded-lg shadow-md overflow-hidden ${statusColors[post.status]}`}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex gap-2">
                  <span className="font-semibold">@{post.user}</span>
                  <span className="text-gray-500">| {post.postDate}</span>
                </div>
                <span className="uppercase font-semibold">{post.status}</span>
              </div>

              {/* Body */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-3">{post.recommendationTitle}</h3>
                {post.imageUrl && (
                  <div className="text-center mb-3">
                    <img
                      src={post.imageUrl}
                      alt={post.recommendationTitle}
                      className="w-full max-w-xs mx-auto rounded shadow"
                    />
                  </div>
                )}
                <p className="text-gray-700 mb-4">{post.description}</p>

                {/* Comentários */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Comentários:</h4>
                  {post.comments.length ? (
                    post.comments.map((c) => (
                      <div
                        key={c.id}
                        className="flex justify-between items-start p-2 bg-gray-50 rounded mb-2 border-l-4 border-blue-500"
                      >
                        <span>
                          <strong>@{c.user}:</strong> {c.text}
                        </span>
                        <button
                          className="text-red-500 text-sm"
                          onClick={() => handleDeleteComment(post.postId, c.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 italic">Nenhum comentário</p>
                  )}
                </div>

                {/* Ações */}
                <div className="flex flex-wrap gap-2">
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded"
                    onClick={() => handleApprove(post.postId)}
                  >
                    ✓ Aprovar
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleReject(post.postId)}
                  >
                    ✕ Rejeitar
                  </button>
                  <button
                    className="px-3 py-1 bg-cyan-500 text-white rounded"
                    onClick={() => handleEdit(post.postId)}
                  >
                    ✎ Editar
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-500 text-white rounded"
                    onClick={() => handleDelete(post.postId)}
                  >
                    🗑 Excluir
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center text-gray-500 shadow rounded-lg bg-white">
            Nenhuma postagem para moderar no momento.
          </div>
        )}
      </main>
    </div>
  );
}
