"use client";

import { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { Loader2, Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./LivrosPage.module.css";

export default function LivrosPage() {
  const [generos, setGeneros] = useState(["Todos"]);
  const [busca, setBusca] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("Todos");
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputBusca, setInputBusca] = useState("");
  const [inputLoading, setInputLoading] = useState(false);
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [verMais, setVerMais] = useState(false);

  const buscarLivros = async (buscaValor = busca, genero = filtroGenero) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/livros?busca=${buscaValor}&genero=${genero}`);
      const data = await res.json();

      setLivros(data.filter(l => l.disponivel));
    } catch {
      setLivros([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarLivros();
  }, []);

  useEffect(() => {
    const obterGeneros = async () => {
      const res = await fetch("/api/livros");
      const data = await res.json();
      const lista = ["Todos", ...new Set(data.map((l) => l.genero))];
      setGeneros(lista);
    };
    obterGeneros();
  }, []);

  const handleSearch = async () => {
    if (!inputBusca) return;
    setInputLoading(true);
    await new Promise((res) => setTimeout(res, 300));
    setBusca(inputBusca);
    buscarLivros(inputBusca, filtroGenero);
    setInputLoading(false);
  };

  const handleClear = () => {
    setInputBusca("");
    setBusca("");
    buscarLivros("", filtroGenero);
  };

  const handleFiltro = (genero) => {
    setFiltroGenero(genero);
    buscarLivros(busca, genero);
  };

  return (
    <div className={styles.container}>
      <Typography variant="h3" className={styles.titulo}>
        Conheça nossos livros Disponiveis
      </Typography>


      <div className={styles.buscaFiltro}>
        <select
          value={filtroGenero}
          onChange={(e) => handleFiltro(e.target.value)}
          className={styles.selectFiltro}
        >
          {generos.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <div className={styles.inputGrupo}>
          <input
            type="text"
            value={inputBusca}
            onChange={(e) => setInputBusca(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Livro, autor ou gênero..."
            className={styles.inputBusca}
          />
          <button
            onClick={handleSearch}
            disabled={!inputBusca || inputLoading}
            className={`${styles.botao} ${styles.botaoPrimario}`}
          >
            {inputLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </button>
          <button
            onClick={handleClear}
            disabled={!inputBusca}
            className={`${styles.botao} ${styles.botaoSecundario}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>


      {loading ? (
        <Typography className="text-center text-gray-500 mt-4">
          Carregando livros...
        </Typography>
      ) : (
        <div className={styles.gridLivros}>
          {livros.map((livro) => (
            <div
              key={livro.id}
              className={styles.cardLivro}
              onClick={() => {
                setLivroSelecionado(livro);
                setVerMais(false);
              }}
            >
              <img src={livro.imagem || "/placeholder.png"} alt={livro.titulo} className={styles.imgLivro} />
              <div className={styles.infoLivro}>
                <h3 className="font-semibold text-gray-800">{livro.titulo}</h3>
                <p className="text-sm text-gray-500">{livro.autor}</p>
                <p className={styles.disponivel}>Disponível</p>
              </div>
            </div>
          ))}
        </div>
      )}


      {livroSelecionado && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLivroSelecionado(null)}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >

            <div className={styles.modalHeader}>
              <img src={livroSelecionado.imagem || "/placeholder.png"} alt={livroSelecionado.titulo} />
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{livroSelecionado.titulo}</h2>
                <p className="text-sm text-gray-500">{livroSelecionado.autor}</p>
                <p className={styles.disponivel}>Disponível</p>
              </div>
            </div>

            <div className={styles.modalBody}>
              <button
                className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                onClick={() => setVerMais(!verMais)}
              >
                {verMais ? "Ocultar detalhes" : "Ver mais detalhes"}
                {verMais ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {verMais && (
                <div className="space-y-1 text-sm text-gray-700 mt-2">
                  <p>
                    <strong>Gênero:</strong> {livroSelecionado.genero}
                  </p>
                  <p>
                    <strong>Editora:</strong> {livroSelecionado.editora}
                  </p>
                  <p>
                    <strong>Ano:</strong> {livroSelecionado.ano}
                  </p>
                  <p>
                    <strong>Doador:</strong> {livroSelecionado.doador || "Não informado"}
                  </p>
                  <p>
                    <strong>Observações:</strong> {livroSelecionado.observacoes || "Nenhuma"}
                  </p>
                  <p>
                    <strong>Sinopse:</strong> {livroSelecionado.sinopse || "Sem sinopse"}
                  </p>
                </div>
              )}
            </div>


            <div className={styles.modalActions}>
              <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
                Solicitar Doação
              </button>
              <button
                className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition"
                onClick={() => setLivroSelecionado(null)}
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
