"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea, Button, Typography } from "@material-tailwind/react";

interface Livro {
  id?: number;
  titulo: string;
  autor: string;
  editora?: string;
  genero?: string;
  ano?: number;
  sinopse?: string;
  observacoes?: string;
  imagem?: string;
}

export default function DoarLivroPage() {
  const [livro, setLivro] = useState<Livro>({ titulo: "", autor: "" });
  const [salvando, setSalvando] = useState(false);
  const router = useRouter();

const handleSave = async () => {
  setSalvando(true);
  try {
    const res = await fetch("/api/doar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(livro),
    });
    if (!res.ok) throw new Error("Erro ao cadastrar livro");

    alert("Livro cadastrado com sucesso!");

    // Limpa o formulário para que o usuário possa cadastrar outro livro
    setLivro({ titulo: "", autor: "" });

  } catch (err) {
    console.error(err);
    alert("Falha ao cadastrar livro");
  } finally {
    setSalvando(false);
  }
};


  return (
    <div className="p-4 max-w-md mx-auto">
      <Typography variant="h4" className="mb-4">Doar Livro</Typography>

      <Input
        label="Título"
        value={livro.titulo}
        onChange={(e) => setLivro({ ...livro, titulo: e.target.value })}
        className="mb-3"
      />
      <Input
        label="Autor"
        value={livro.autor}
        onChange={(e) => setLivro({ ...livro, autor: e.target.value })}
        className="mb-3"
      />
      <Input
        label="Editora"
        value={livro.editora || ""}
        onChange={(e) => setLivro({ ...livro, editora: e.target.value })}
        className="mb-3"
      />
      <Input
        label="Gênero"
        value={livro.genero || ""}
        onChange={(e) => setLivro({ ...livro, genero: e.target.value })}
        className="mb-3"
      />
      <Input
        label="Ano"
        type="number"
        value={livro.ano || ""}
        onChange={(e) => setLivro({ ...livro, ano: Number(e.target.value) || undefined })}
        className="mb-3"
      />
      <Textarea
        label="Sinopse"
        value={livro.sinopse || ""}
        onChange={(e) => setLivro({ ...livro, sinopse: e.target.value })}
        className="mb-3"
      />
      <Textarea
        label="Observações"
        value={livro.observacoes || ""}
        onChange={(e) => setLivro({ ...livro, observacoes: e.target.value })}
        className="mb-3"
      />

      <Button onClick={handleSave} disabled={salvando}>
        {salvando ? "Salvando..." : "Doar Livro"}
      </Button>
    </div>
  );
}
