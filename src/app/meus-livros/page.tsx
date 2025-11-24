"use client";

import { useState, useEffect, useCallback } from "react";
import { Typography, Button, Input, Textarea, Card, CardBody } from "@material-tailwind/react";
import { Loader2, X, Plus } from "lucide-react";

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  editora?: string;
  genero?: string;
  ano?: number;
  sinopse?: string;
  observacoes?: string;
  imagem?: string;
}

export default function MeusLivrosPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(false);
  const [excluindoId, setExcluindoId] = useState<number | null>(null);
  const [novoLivro, setNovoLivro] = useState<Livro | null>(null);
  const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null);
  const [salvando, setSalvando] = useState(false);

  // ----------- Buscar livros cadastrados -----------
  const buscarLivros = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/doar");
      if (!res.ok) throw new Error("Falha ao buscar livros");
      const data: Livro[] = await res.json();
      setLivros(data);
    } catch (err) {
      console.error(err);
      setLivros([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    buscarLivros();
  }, [buscarLivros]);

  // ----------- Excluir livro -----------
  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir este livro?")) return;

    setExcluindoId(id);
    try {
      const res = await fetch(`/api/doar/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Falha ao excluir livro");
      setLivros(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setExcluindoId(null);
    }
  };

  // ----------- Salvar edição -----------
  const handleSave = async () => {
    if (!livroSelecionado) return;
    setSalvando(true);

    try {
      const res = await fetch(`/api/doar/${livroSelecionado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(livroSelecionado),
      });
      if (!res.ok) throw new Error("Falha ao salvar livro");

      const data: Livro = await res.json();
      setLivros(prev => prev.map(l => (l.id === data.id ? data : l)));
      setLivroSelecionado(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSalvando(false);
    }
  };

  // ----------- Salvar novo livro -----------
  const handleSaveNovoLivro = async () => {
    if (!novoLivro) return;
    setSalvando(true);

    try {
      const res = await fetch("/api/doar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoLivro),
      });
      if (!res.ok) throw new Error("Falha ao cadastrar livro");

      const data: Livro = await res.json();
      setLivros(prev => [...prev, data]);
      setNovoLivro(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSalvando(false);
    }
  };

  // ----------- Layout -----------
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        <Typography className="ml-2 text-gray-500">Carregando seus livros...</Typography>
      </div>
    );
  }

if (!livros.length) {
  return (
    <div className="text-center mt-8">
      <Typography className="text-gray-500 mb-4">
        Você ainda não possui livros cadastrados.
      </Typography>
      <a
        href="/doar"
        className="text-blue-600 hover:underline font-medium"
      >
        Clique aqui para cadastrar um livro
      </a>
    </div>
  );
}


  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {livros.map(livro => (
          <Card key={livro.id} className="shadow-sm">
            <CardBody>
              <img
                src={livro.imagem || "/placeholder.png"}
                alt={livro.titulo}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="font-semibold text-gray-800">{livro.titulo}</h3>
              <p className="text-sm text-gray-500">{livro.autor}</p>

              <div className="flex gap-2 mt-4">
                <Button size="sm" color="blue" onClick={() => setLivroSelecionado(livro)}>
                  Editar
                </Button>
                <Button
                  size="sm"
                  color="red"
                  onClick={() => handleDelete(livro.id)}
                  disabled={excluindoId === livro.id}
                >
                  {excluindoId === livro.id ? <Loader2 className="w-4 h-4 animate-spin" /> : "Excluir"}
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Modal edição */}
      {livroSelecionado && (
        <ModalLivro
          titulo="Editar Livro"
          livro={livroSelecionado}
          setLivro={setLivroSelecionado}
          onSave={handleSave}
          salvando={salvando}
        />
      )}

      {/* Modal cadastro */}
      {novoLivro && (
        <ModalLivro
          titulo="Adicionar Livro"
          livro={novoLivro}
          setLivro={setNovoLivro}
          onSave={handleSaveNovoLivro}
          salvando={salvando}
        />
      )}
    </div>
  );
}

// Componente de Modal Reutilizável
interface ModalProps {
  titulo: string;
  livro: Livro;
  setLivro: (livro: Livro | null) => void;
  onSave: () => void;
  salvando: boolean;
}

function ModalLivro({ titulo, livro, setLivro, onSave, salvando }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={() => !salvando && setLivro(null)}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-md max-h-full overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{titulo}</h2>
          <Button size="sm" variant="text" color="gray" onClick={() => setLivro(null)} className="p-2">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-3">
          <Input label="Título" value={livro.titulo} onChange={e => setLivro({ ...livro, titulo: e.target.value })} />
          <Input label="Autor" value={livro.autor} onChange={e => setLivro({ ...livro, autor: e.target.value })} />
          <Input label="Editora" value={livro.editora || ""} onChange={e => setLivro({ ...livro, editora: e.target.value })} />
          <Input label="Gênero" value={livro.genero || ""} onChange={e => setLivro({ ...livro, genero: e.target.value })} />
          <Input label="Ano" type="number" value={livro.ano || ""} onChange={e => setLivro({ ...livro, ano: Number(e.target.value) || undefined })} />
          <Textarea label="Sinopse" value={livro.sinopse || ""} onChange={e => setLivro({ ...livro, sinopse: e.target.value })} />
          <Textarea label="Observações" value={livro.observacoes || ""} onChange={e => setLivro({ ...livro, observacoes: e.target.value })} />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button size="sm" color="blue" onClick={onSave} disabled={salvando}>
            {salvando ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar"}
          </Button>
          <Button size="sm" variant="outlined" color="gray" onClick={() => setLivro(null)} disabled={salvando}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
