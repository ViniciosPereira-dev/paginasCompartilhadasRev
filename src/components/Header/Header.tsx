"use client";

import Logo from "../Logo/Logo";
import styles from "./Header.module.css";
import { useState } from "react";
import { LoginModal } from "../LoginModal/LoginModal";
import { usePathname, useRouter } from "next/navigation";

import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";

import {
  HomeIcon,
  BuildingLibraryIcon,
  CalendarIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  PlusIcon,
  ArrowUpTrayIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const navLinks = [
  { href: "hero", label: "Home", icon: HomeIcon },
  { href: "instituicoes", label: "Instituições", icon: BuildingLibraryIcon },
  { href: "eventos", label: "Eventos", icon: CalendarIcon },
  { href: "sobre", label: "Sobre", icon: InformationCircleIcon },
  { href: "faq", label: "FAQ", icon: QuestionMarkCircleIcon },
];

export default function Header() {
  const [activeLink, setActiveLink] = useState("hero");
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (section: string) => {
    setActiveLink(section);

    if (pathname === "/") {
      // Se já estamos na home, rola até a seção
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Se estamos em outra página, vai para home com hash
      router.push(`/#${section}`);
    }
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>

      <nav className={styles.nav}>
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`${styles.navLink} ${activeLink === link.href ? styles.active : ""}`}
            >
              <Icon className="w-5 h-5" />
              {link.label}
              <span className={styles.underline}></span>
            </button>
          );
        })}

        {/* Dropdown Menu */}
        <Menu>
          <MenuHandler>
            <Button variant="text" className={styles.menuButton} ripple={false}>
              <PlusIcon className="w-6 h-6" />
            </Button>
          </MenuHandler>

          <MenuList>
            <MenuItem>
              <a href="/doar" className="flex items-center gap-2">
                <ArrowUpTrayIcon className="w-5 h-5" />
                Doar livro
              </a>
            </MenuItem>

            <MenuItem>
              <a href="/livros" className="flex items-center gap-2">
                <BookOpenIcon className="w-5 h-5" />
                Livros
              </a>
            </MenuItem>

            <MenuItem>
              <a href="#" className="flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                Fórum
              </a>
            </MenuItem>
          </MenuList>
        </Menu>
      </nav>

      <div className={styles.btnContainer}>
        <Button>Cadastrar</Button>
        <LoginModal />
      </div>
    </header>
  );
}
