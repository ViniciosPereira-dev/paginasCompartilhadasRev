"use client";

import React, { useState } from "react";
import { Loader2, XCircle } from "lucide-react";
import styles from "./InstituicoesProximas.module.css";

import {
  Typography,
  Input,
  Button,
  Alert,
} from "@material-tailwind/react";
import CardInstituicao from "../CardInstituicao/CardInstituicao";

export default function InstituicoesProximas() {
  const [cep, setCep] = useState("");
  const [resultados, setResultados] = useState<any[]>([]);
  const [buscou, setBuscou] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const buscarInstituicoes = async () => {
    if (cep.length < 8) {
      setErro("Digite um CEP válido (8 números).");
      return;
    }

    setErro("");
    setLoading(true);
    setBuscou(false);
    setResultados([]);

    try {
      const respostaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dadosCep = await respostaCep.json();

      if (dadosCep.erro) {
        setErro("CEP não encontrado. Verifique e tente novamente.");
        setLoading(false);
        return;
      }

      const cidade = dadosCep.localidade;
      const estado = dadosCep.uf;

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const respostaAPI = await fetch(
        `/api/instituicoes?cidade=${cidade}&estado=${estado}`
      );
      const dados = await respostaAPI.json();

      setResultados(dados);
      setBuscou(true);
    } catch (e) {
      setErro("Erro ao buscar instituições. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const limparBusca = () => {
    setCep("");
    setResultados([]);
    setBuscou(false);
    setErro("");
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Typography variant="h3" className="text-center text-gray-700 font-bold">
        Encontre instituições próximas de você
      </Typography>

      <div className="flex flex-col items-center gap-2 mt-4">
        <div className="flex gap-1">
          <Input
            label="Digite seu CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="pr-10"
          />

          {cep && (
            <button
              onClick={limparBusca}
              className="text-gray-500 hover:text-red-500 transition"
              aria-label="Limpar CEP"
            >
              <XCircle size={20} />
            </button>
          )}
        </div>


        <Button
          type="button"
          onClick={buscarInstituicoes}
          className=""
          disabled={loading}
        >
          {loading ? "Buscando..." : "Buscar"}
        </Button>


        {erro && (
          <Alert
            color="red"
            className="mx-auto mt-2 text-center px-4 py-2 max-w-[300px]"
          >
            {erro}
          </Alert>
        )}
      </div>


      {(loading || buscou) && (
        <div className="flex flex-col items-center mt-4 w-full max-w-4xl">
          {loading && (
            <div className="flex flex-col items-center justify-center animate-fadeIn">
              <Loader2 className="h-10 w-10 animate-spin" />
              <Typography color="gray">Carregando instituições...</Typography>
            </div>
          )}

          {!loading && buscou && resultados.length === 0 && !erro && (
            <Alert
              color="amber"
              className="mx-auto mt-4 px-4 py-2 max-w-[300px] text-center"
            >
              Nenhuma instituição próxima encontrada 😕
            </Alert>
          )}


          {!loading && resultados.length > 0 && (
            <div className={styles.card}>
              {resultados.map((inst) => (
                <CardInstituicao key={inst.id} inst={inst} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
