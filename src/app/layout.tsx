import "../styles/globals.css";
import Header from "../components/Header/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Poppins', sans-serif" }}>
        <Header />
        {children}
      </body>
    </html>
  );
}

