"use client";

import { Carousel, Card, Typography, Button } from "@material-tailwind/react";
import Link from "next/link";
import styles from "./CarouselEventos.module.css";

interface Evento {
  id: number;
  titulo: string;
  data: string;
  descricao: string;
  imagem: string;
}

interface CarouselEventosProps {
  eventos?: Evento[];
}

export default function CarouselEventos({ eventos = [] }: CarouselEventosProps) {
  if (!eventos || eventos.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Nenhum evento disponível no momento.
      </div>
    );
  }

return (
  <div>
    <div className="text-center">
      <Typography
        variant="h3"
        className="font-bold text-gray-700 tracking-tight"
      >
        Próximos Eventos
      </Typography>
      <Typography
        variant="small"
        className="text-gray-600"
      >
        Fique por dentro das próximas atividades e participe dos eventos que estão por vir
      </Typography>
    </div>

    <Carousel
      loop
      autoplay
      autoplayDelay={5000}
      className={styles.carouselContainer}
      transition={{ type: "spring", duration: 0.8 }}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className={styles.carouselNavigation}>
          {Array.from({ length }).map((_, i) => (
            <span
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`${styles.carouselDot} ${activeIndex === i ? styles.activeDot: ""}`}
            />
          ))}
        </div>
      )}
    >
      {eventos.map((evento) => (
        <Card key={evento.id} className={styles.carouselCard}>
          <img src={evento.imagem} alt={evento.titulo} />
          <div className={styles.cardOverlay}>
            <Typography variant="h5" className={styles.cardTitle}>
              {evento.titulo}
            </Typography>
            <Typography className={styles.cardDate}>{evento.data}</Typography>
            <div className={styles.cardButtonContainer}>
              <Link href={`/eventos/${evento.id}`}>
                <Button size="sm" color="white" className={styles.btnAnimated}>
                  Ver detalhes
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </Carousel>
  </div>
);

}
