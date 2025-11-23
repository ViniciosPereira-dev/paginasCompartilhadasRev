"use client";

import "../styles/globals.css";
import Header from "../components/Header/Header";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // rotas que NÃO devem ter header
  const hideHeader = pathname === "/cadastro";

  return (
    <html lang="pt-br">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body style={{ fontFamily: "'Poppins', sans-serif" }}>
        {!hideHeader && <Header />} {/* SO SOME NESSA ROTA */}
        {children}
      </body>
    </html>
  );
}
