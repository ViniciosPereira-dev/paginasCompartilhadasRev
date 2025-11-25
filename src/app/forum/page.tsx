"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Textarea,
  Typography,
} from "@material-tailwind/react";

import {
  PhotoIcon,
  VideoCameraIcon,
  PaperClipIcon,
  UserCircleIcon,
  HandThumbUpIcon,
  ChatBubbleLeftRightIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/solid";

export default function ForumPage() {
  const [posts, setPosts] = useState([
    {
      author: "Maria Oliveira",
      date: "25/05/2025",
      text: "Acabei de ler “O Pequeno Príncipe” novamente. Essa obra nunca envelhece ✨",
      imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
      likes: 12,
      comments: 3,
      shares: 1,
    },
    {
      author: "Carlos Alberto",
      date: "24/05/2025",
      text: "Qual livro mudou sua vida? Quero começar algo realmente inspirador.",
      likes: 4,
      comments: 7,
      shares: 0,
    },
  ]);

  const [newText, setNewText] = useState("");

  const publishPost = () => {
    if (!newText.trim()) return;

    const newPost = {
      author: "João Silva",
      date: new Date().toLocaleDateString(),
      text: newText,
      likes: 0,
      comments: 0,
      shares: 0,
    };

    setPosts([newPost, ...posts]);
    setNewText(""); // limpar textarea
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20 pt-28 flex flex-col items-center">
      <Typography variant="h4" className="mb-6 font-semibold">
        Fórum da Comunidade 📚
      </Typography>

      {/* ================= PUBLICAR POST ================= */}
      <Card className="w-full max-w-2xl shadow-md rounded-xl p-4">
        <CardBody className="flex flex-col gap-4">

          <div className="flex gap-3">
            <UserCircleIcon className="w-10 h-10 text-gray-600" />
            <Textarea
              label="No que você está pensando?"
              className="w-full"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outlined" size="sm" className="flex items-center gap-2">
                <PhotoIcon className="w-5 h-5" /> Imagem
              </Button>
              <Button variant="outlined" size="sm" className="flex items-center gap-2">
                <VideoCameraIcon className="w-5 h-5" /> Vídeo
              </Button>
              <Button variant="outlined" size="sm" className="flex items-center gap-2">
                <PaperClipIcon className="w-5 h-5" /> Arquivo
              </Button>
            </div>

            <Button size="sm" color="blue" onClick={publishPost}>
              Publicar
            </Button>
          </div>

        </CardBody>
      </Card>

      {/* ================= LISTA DE POSTS ================= */}
      <div className="w-full max-w-2xl flex flex-col items-center mt-6">
        {posts.map((post, i) => (
          <Card key={i} className="w-full shadow-md rounded-xl p-4 mb-6">
            <CardBody className="flex flex-col gap-4">

              {/* HEADER */}
              <div className="flex items-center gap-3">
                <UserCircleIcon className="w-10 h-10 text-gray-600" />
                <div>
                  <Typography className="font-semibold">
                    {post.author}
                  </Typography>
                  <Typography className="text-xs text-gray-500">
                    Publicado em {post.date}
                  </Typography>
                </div>
              </div>

              {/* TEXTO */}
              <Typography className="text-gray-800">{post.text}</Typography>

              {/* IMAGEM */}
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Post"
                  className="rounded-lg w-full max-h-[300px] object-cover"
                />
              )}

              {/* AÇÕES */}
              <div className="flex gap-3 pt-2">

                <Button variant="outlined" size="sm" className="flex items-center gap-2">
                  <HandThumbUpIcon className="w-5 h-5" />
                  Curtir
                  <span className="text-gray-600">({post.likes})</span>
                </Button>

                <Button variant="outlined" size="sm" className="flex items-center gap-2">
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  Comentar
                  <span className="text-gray-600">({post.comments})</span>
                </Button>

                <Button variant="outlined" size="sm" className="flex items-center gap-2">
                  <ArrowUpRightIcon className="w-5 h-5" />
                  Compartilhar
                  <span className="text-gray-600">({post.shares})</span>
                </Button>

              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
