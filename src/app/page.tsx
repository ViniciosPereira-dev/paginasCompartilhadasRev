"use client"

import InstituicoesProximas from "../components/InstituicoesProximas/InstituicoesProximas";
import styles from "../styles/Home.module.css";
import CarouselEventos from "../components/CarouselEventos/CarouselEventos";
import { eventos } from "../data/eventos";
import { Button, Typography } from "@material-tailwind/react";
import { Instagram, Linkedin, Facebook } from "lucide-react";
import Faq from "../components/Faq/Faq";
import Footer from "../components/Footer/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>

    {/* Hero*/ }
    <section id="hero" className={styles.heroDesktop}>
      <div className={styles.overlay}></div>
      <div className="relative z-10 text-center text-white flex flex-col items-center justify-center h-[80vh] px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-md">
          Conecte-se através dos livros
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-6 drop-shadow-lg">
          Doe, compartilhe e descubra novas histórias. Faça parte da nossa comunidade de leitores.
        </p>

        <div className={styles.btnContainer}>
          <button className={styles.btnDoar}>Doar</button>
            <Link href="/livros" className={styles.btnExplorar}>
            Explorar Livros
            </Link>
        </div>
      </div>

    </section>

    {/* instituicoesSec*/ }
    <section id="instituicoes" className={styles.instituicoesContainer}>
      <InstituicoesProximas/>
    </section>

    {/* eventossSec*/ }
    <section id="eventos" className={styles.eventosContainer}>
      <CarouselEventos eventos={eventos}/>
    </section>

    {/* sobreSec*/ }
    <section id="sobre" className={styles.secaoSobre}>
      <div className={styles.container}>
        {/* Imagem */}
        <div className={styles.imagemWrapper}>
          <img
            src="/imagens/aboutUs.svg"
            alt="Ilustração sobre colaboração e equipe"
          />
        </div>

        {/* Texto */}
        <div className={styles.textoWrapper}>
          <Typography variant="h4" className={styles.titulo}>
            Sobre Nós
          </Typography>

          <Typography variant="paragraph" className={styles.descricao}>
            Somos uma equipe dedicada a conectar pessoas, ideias e instituições.
            Nosso objetivo é facilitar o acesso à informação e promover a
            colaboração por meio da tecnologia e da inovação.
          </Typography>

          <div className={styles.botoesRedes}>
            <Button>Saiba mais</Button>

            <div className={styles.redesSociais}>
              <Instagram className="w-6 h-6 hover:scale-110 transition-transform" />
              <Linkedin className="w-6 h-6 hover:scale-110 transition-transform" />
              <Facebook className="w-6 h-6 hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* FaqSec */}
    <section id="faq" className={styles.faqContainer}>
      <Faq />
    </section>

    <footer>
    <Footer/>
    </footer>    



    </>  
  );
}
