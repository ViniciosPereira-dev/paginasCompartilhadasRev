"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import styles from "./Faq.module.css";

const faqs = [
  {
    pergunta: "Como posso participar dos eventos?",
    resposta:
      "Acesse a seção de eventos, escolha o que deseja e siga as instruções para inscrição. Alguns eventos podem exigir cadastro prévio.",
  },
  {
    pergunta: "A plataforma é gratuita?",
    resposta:
      "Sim, o acesso básico é totalmente gratuito. Algumas funcionalidades adicionais poderão ser disponibilizadas futuramente.",
  },
  {
    pergunta: "Posso cadastrar minha instituição?",
    resposta:
      "Sim! Acesse a seção de instituições e preencha o formulário de cadastro. Nossa equipe fará a validação antes da publicação.",
  },
  {
    pergunta: "Como entro em contato com o suporte?",
    resposta:
      "Você pode enviar uma mensagem pelo formulário de contato ou e-mail. Nossa equipe retornará o mais rápido possível.",
  },
];

export default function Faq() {
  const [aberto, setAberto] = useState<number | null>(null);

  const togglePergunta = (index: number) => {
    setAberto(aberto === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {/* Título */}
        <Typography variant="h4" color="blue-gray" className={styles.titulo}>
          Perguntas Frequentes
        </Typography>

        {/* Lista de perguntas */}
        <div className={styles.grid}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.card}>
              {/* Cabeçalho da pergunta */}
              <button
                onClick={() => togglePergunta(index)}
                className={styles.header}
              >
                <div className={styles.perguntaWrapper}>
                  <HelpCircle className={styles.icon} />
                  <Typography variant="h6" className={styles.pergunta}>
                    {faq.pergunta}
                  </Typography>
                </div>
                <ChevronDown
                  className={`${styles.chevron} ${
                    aberto === index ? styles.rotate : ""
                  }`}
                />
              </button>

              {/* Resposta */}
              <motion.div
                initial={false}
                animate={{
                  height: aberto === index ? "auto" : 0,
                  opacity: aberto === index ? 1 : 0,
                }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className={styles.respostaContainer}
              >
                <Typography color="gray" className={styles.resposta}>
                  {faq.resposta}
                </Typography>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
