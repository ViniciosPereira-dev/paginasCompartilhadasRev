"use client";

import Logo from "../Logo/Logo";
import styles from "./Header.module.css";
import { useState, useEffect, useRef } from "react";
import { LoginModal } from "../LoginModal/LoginModal";
import { usePathname, useRouter } from "next/navigation";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

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
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { LibraryIcon, PlusCircle } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "hero", label: "Home", icon: HomeIcon },
  { href: "instituicoes", label: "Instituições", icon: BuildingLibraryIcon },
  { href: "eventos", label: "Eventos", icon: CalendarIcon },
  { href: "sobre", label: "Sobre", icon: InformationCircleIcon },
  { href: "faq", label: "FAQ", icon: QuestionMarkCircleIcon },
];

export default function Header() {
  const [activeLink, setActiveLink] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleNavClick = (section: string) => {
    setActiveLink(section);

    if (pathname === "/") {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${section}`);
    }

    setMenuOpen(false);
  };


  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);


  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!menuRef.current) return;


      if (e.target instanceof Element && e.target.classList.contains(styles.mobileOverlay)) {
        setMenuOpen(false);
        return;
      }


      if ((e.target as HTMLElement).closest("a")) return;


      if (!menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

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


        <Menu>
          <MenuHandler>
            <Button variant="text" className={styles.menuButton} ripple={false}>
              <PlusIcon className="w-6 h-6" />
            </Button>
          </MenuHandler>

          <MenuList>
            <MenuItem>
              <Link href="/doar" className="flex items-center gap-2">
                <ArrowUpTrayIcon className="w-5 h-5" />
                Doar livro
              </Link>
            </MenuItem>

            <MenuItem>
              <Link href="/livros" className="flex items-center gap-2">
                <BookOpenIcon className="w-5 h-5" />
                Livros
              </Link>
            </MenuItem>

            <MenuItem>
              <Link href="/forum" className="flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                Fórum
              </Link>
            </MenuItem>

            <MenuItem>
              <Link href="/meus-livros" className="flex items-center gap-2">
                <LibraryIcon className="w-5 h-5" />
                Meus livros
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </nav>

      <div className={styles.btnContainer}>
        <Link href="/cadastro">
          <Button className="flex items-center gap-2" title="Cadastrar">
            <PlusCircle size={22} />
          </Button>
        </Link>

        <LoginModal />
      </div>


      <button
        className={styles.mobileMenuButton}
        onClick={() => setMenuOpen(true)}
      >
        <Bars3Icon className="w-7 h-7" />
      </button>

    
      {menuOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobileMenu} ref={menuRef}>
            <button
              className={styles.mobileClose}
              onClick={() => setMenuOpen(false)}
            >
              <XMarkIcon className="w-7 h-7" />
            </button>

            <div className={styles.mobileLinks}>
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={styles.mobileNavItem}
                  >
                    <Icon className="w-6 h-6" />
                    {link.label}
                  </button>
                );
              })}

              <hr className="my-4" />

              <Link href="/doar" className={styles.mobileNavItem}>
                <ArrowUpTrayIcon className="w-6 h-6" />
                Doar livro
              </Link>

              <Link href="/livros" className={styles.mobileNavItem}>
                <BookOpenIcon className="w-6 h-6" />
                Livros
              </Link>

              <Link href="/meus-livros" className={styles.mobileNavItem}>
                <LibraryIcon className="w-6 h-6" />
                Meus livros
              </Link>

              <Link href="/forum" className={styles.mobileNavItem}>
                <ChatBubbleLeftRightIcon className="w-6 h-6" />
                Fórum
              </Link>

              <LoginModal />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
