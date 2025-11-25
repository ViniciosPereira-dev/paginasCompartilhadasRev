"use client";

import { Typography } from "@material-tailwind/react";
import styles from "./Footer.module.css";

const links = [
  { label: "Início", href: "#hero" },
  { label: "Instituições", href: "#instituicoes" },
  { label: "Eventos", href: "#eventos" },
  { label: "Sobre", href: "#sobre" },
  { label: "FAQ", href: "#faq" },
];

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.inner}>
        {/* Logo */}
        <div className={styles.logoWrapper}>
          <img
            src="/imagens/logo.png"
            alt="Logo da plataforma"
            className={styles.logo}
          />
        </div>


        <ul className={styles.links}>
          {links.map((link, index) => (
            <li key={index}>
              <Typography
                as="a"
                href={link.href}
                className={styles.link}
              >
                {link.label}
              </Typography>
            </li>
          ))}
        </ul>
      </div>


      <hr className={styles.divider} />
      <Typography className={styles.copy}>
        &copy; {new Date().getFullYear()} Páginas Compartilhadas
      </Typography>
    </div>
  );
}
