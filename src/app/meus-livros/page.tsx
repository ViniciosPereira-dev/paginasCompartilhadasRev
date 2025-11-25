"use client";
import { useEffect, useState } from "react";
import { Typography, Button, Input, Textarea, Card } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function MeusLivrosPage() {
  const [livros, setLivros] = useState<any[]>([]);
  const [livroSelecionado, setLivroSelecionado] = useState<any>(null);
  const [formValues, setFormValues] = useState({ titulo: "", autor: "", observacoes: "", imagem: null });
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const carregar = async () => {
    const res = await fetch("/api/livrosDoacao");
    const data = await res.json();
    setLivros(data);
  };

  useEffect(() => {
    carregar();
  }, []);

  const remover = async (id: number) => {
    try {
      await fetch("/api/livrosDoacao", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setAlert({ type: "success", message: "Livro removido com sucesso!" });
      carregar();
    } catch {
      setAlert({ type: "error", message: "Falha ao remover livro" });
    }
    setTimeout(() => setAlert(null), 3000);
  };

  const abrirModal = (livro: any) => {
    setLivroSelecionado(livro);
    setFormValues({
      titulo: livro.titulo,
      autor: livro.autor,
      observacoes: livro.observacoes || "",
      imagem: null, 
    });
  };

  const fecharModal = () => setLivroSelecionado(null);

  const salvarEdicao = async () => {
    if (!livroSelecionado) return;

    const formData = new FormData();
    formData.append("id", livroSelecionado.id);
    formData.append("titulo", formValues.titulo);
    formData.append("autor", formValues.autor);
    formData.append("observacoes", formValues.observacoes);
    if (formValues.imagem) formData.append("imagem", formValues.imagem);

    try {
      await fetch("/api/livrosDoacao", { method: "PUT", body: formData });
      setAlert({ type: "success", message: "Livro atualizado com sucesso!" });
      fecharModal();
      carregar();
    } catch {
      setAlert({ type: "error", message: "Falha ao atualizar livro" });
    }

    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto relative">


      {alert && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white z-50
          ${alert.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {alert.type === "success" ? (
            <CheckCircleIcon className="w-5 h-5 inline mr-2" />
          ) : (
            <ExclamationCircleIcon className="w-5 h-5 inline mr-2" />
          )}
          <span className="font-medium">{alert.message}</span>
        </div>
      )}



      {livros.length === 0 ? (
        <div className="text-center py-20">
          <Typography variant="h5" className="mb-4 text-gray-600">
            Você ainda não cadastrou nenhum livro para doação
          </Typography>
          <Button
            color="blue"
            onClick={() => window.location.href = "/doar"} 
          >
            Cadastrar meu primeiro livro
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {livros.map((livro) => (
            <Card key={livro.id} className="cursor-pointer hover:shadow-lg" onClick={() => abrirModal(livro)}>
              <img
                src={livro.imagem ? `/uploads/${livro.imagem}` : "/placeholder.png"} // imagem cadastrada
                alt={livro.titulo}
                className="w-full h-48 object-cover rounded-t"
              />
              <div className="p-4">
                <Typography className="font-bold">{livro.titulo}</Typography>
                <Typography className="text-sm text-gray-500">{livro.autor}</Typography>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" color="blue" onClick={(e) => { e.stopPropagation(); abrirModal(livro); }}>Editar</Button>
                  <Button size="sm" color="red" onClick={(e) => { e.stopPropagation(); remover(livro.id); }}>Excluir</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}


{livroSelecionado && (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 pt-20"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={fecharModal}
  >
    <motion.div
      className="bg-white rounded-lg w-full max-w-5xl p-6 relative shadow-lg"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={(e) => e.stopPropagation()}
    >
      <Typography variant="h4" className="font-bold mb-6">{livroSelecionado.titulo}</Typography>
      <Typography className="text-gray-500 mb-6">{livroSelecionado.autor}</Typography>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <Input
            label="Título"
            value={formValues.titulo}
            onChange={(e) => setFormValues({ ...formValues, titulo: e.target.value })}
          />
          <Input
            label="Autor"
            value={formValues.autor}
            onChange={(e) => setFormValues({ ...formValues, autor: e.target.value })}
          />
          <Input
            label="Gênero"
            value={formValues.genero || livroSelecionado.genero || ""}
            onChange={(e) => setFormValues({ ...formValues, genero: e.target.value })}
          />
          <Input
            label="Editora"
            value={formValues.editora || livroSelecionado.editora || ""}
            onChange={(e) => setFormValues({ ...formValues, editora: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Input
            label="Ano"
            type="number"
            value={formValues.ano || livroSelecionado.ano || ""}
            onChange={(e) => setFormValues({ ...formValues, ano: e.target.value })}
          />
          <Textarea
            label="Sinopse"
            value={formValues.sinopse || livroSelecionado.sinopse || ""}
            onChange={(e) => setFormValues({ ...formValues, sinopse: e.target.value })}
          />
          <Textarea
            label="Observações"
            value={formValues.observacoes}
            onChange={(e) => setFormValues({ ...formValues, observacoes: e.target.value })}
          />
          <Input
            type="file"
            label="Alterar Imagem"
            onChange={(e) => setFormValues({ ...formValues, imagem: e.target.files?.[0] || null })}
          />
          {formValues.imagem ? (
            <img
              src={URL.createObjectURL(formValues.imagem)}
              alt="Preview"
              className="w-full h-48 object-cover rounded"
            />
          ) : livroSelecionado.imagem ? (
            <img
              src={`/uploads/${livroSelecionado.imagem}`}
              alt={livroSelecionado.titulo}
              className="w-full h-48 object-cover rounded"
            />
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button color="blue" onClick={salvarEdicao}>Salvar</Button>
        <Button color="gray" onClick={fecharModal}>Fechar</Button>
      </div>
    </motion.div>
  </motion.div>
)}

    </div>
  );
}
