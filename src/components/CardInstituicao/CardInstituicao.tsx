// src/components/CardInstituicao/CardInstituicao.tsx
"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { Typography } from "@material-tailwind/react";
import styles from "./CardInstituicao.module.css";

interface Instituicao {
  id: number;
  nome: string;
  cidade: string;
  estado: string;
  distancia: string;
  descricao: string;
  imagem: string;
}

interface CardProps {
  inst: Instituicao;
}

export default function CardInstituicao({ inst }: CardProps) {
  return (
    <div className={styles.card}>
      {/* Imagem */}
      <div className={styles.imageWrapper}>
        <img src={inst.imagem} alt={inst.nome} className={styles.image} />
      </div>

      {/* Conteúdo */}
      <div className={styles.content}>
        {/* Nome */}
        <Typography variant="h5" className={styles.title}>
          {inst.nome}
        </Typography>

        {/* Localização e distância */}
        <div className={styles.location}>
          <MapPin size={16} />
          <Typography variant="small" className="text-gray-500">
            {inst.cidade}, {inst.estado} ({inst.distancia})
          </Typography>
        </div>

        {/* Descrição */}
        <Typography variant="paragraph" className={styles.description}>
          {inst.descricao}
        </Typography>

        {/* Botão */}
        <button className={styles.button}>Ver Perfil</button>
      </div>
    </div>
  );
}
