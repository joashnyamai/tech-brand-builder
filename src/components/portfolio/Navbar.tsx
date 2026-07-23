import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Keyboard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
    if (storedTheme) {
      setTheme(storedTheme);
      if (storedTheme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("portfolio-theme", next);
      if (next === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
      return next;
    });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderLink = (item: { label: string; href: string }, isMobile = false) => {
    const activeClass = location.pathname === item.href ? "text-cyan" : "text-muted-foreground";
    
    if (isHome) {
      return (
        <a
          href={item.href}
          onClick={() => isMobile && setOpen(false)}
          className={`text-sm hover:text-cyan transition-colors duration-200 tracking-wide font-medium ${activeClass}`}
        >
          {item.label}
        </a>
      );
    } else {
      return (
        <Link
          to={"/" + item.href}
          onClick={() => isMobile && setOpen(false)}
          className={`text-sm hover:text-cyan transition-colors duration-200 tracking-wide font-medium ${activeClass}`}
        >
          {item.label}
        </Link>
      );
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/90 backdrop-blur-md border-b border-navy-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-xl tracking-tight">
          <span className="text-gradient">MN</span>
          <span className="text-foreground/80">.</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              {renderLink(item)}
            </li>
          ))}
          <li>
            <Link
              to="/ai-lab"
              className={`text-sm hover:text-cyan transition-colors duration-200 tracking-wide font-semibold flex items-center gap-1.5 ${
                location.pathname === "/ai-lab" ? "text-cyan" : "text-muted-foreground"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
              Ava AI Lab
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {/* Command Palette Indicator Trigger Button */}
          <button
            onClick={() => {
              const trigger = document.getElementById("trigger-command-palette");
              if (trigger) trigger.click();
            }}
            className="p-2 rounded-lg border border-white/5 bg-white/5 hover:border-cyan text-muted-foreground hover:text-cyan transition-all cursor-pointer"
            title="Search Commands (Ctrl+K)"
          >
            <Keyboard size={15} />
          </button>

          {/* Theme Switcher Button */}
          <button
            id="theme-cycle-button"
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-white/5 bg-white/5 hover:border-cyan text-muted-foreground hover:text-cyan transition-all cursor-pointer"
            title="Toggle theme mode"
          >
            {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          <a
            href={isHome ? "#contact" : "/#contact"}
            className="inline-flex items-center px-4 py-2 rounded-lg border border-cyan text-cyan text-sm font-medium hover:bg-cyan hover:text-primary-foreground transition-all duration-200 hover-glow"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-cyan transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-navy/95 backdrop-blur-md border-b border-navy-border px-6 pb-6"
          >
            <ul className="flex flex-col gap-4 pt-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  {renderLink(item, true)}
                </li>
              ))}
              <li>
                <Link
                  to="/ai-lab"
                  onClick={() => setOpen(false)}
                  className={`text-sm hover:text-cyan transition-colors duration-200 flex items-center gap-1.5 ${
                    location.pathname === "/ai-lab" ? "text-cyan" : "text-muted-foreground"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                  Ava AI Lab
                </Link>
              </li>
              <li>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => {
                        const trigger = document.getElementById("trigger-command-palette");
                        if (trigger) trigger.click();
                      }, 200);
                    }}
                    className="flex-1 py-2 px-3 rounded-lg border border-white/5 bg-white/5 text-muted-foreground text-center text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Keyboard size={14} />
                    <span>Search</span>
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="flex-1 py-2 px-3 rounded-lg border border-white/5 bg-white/5 text-muted-foreground text-center text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
                    <span>Theme</span>
                  </button>
                </div>
              </li>
              <li>
                <a
                  href={isHome ? "#contact" : "/#contact"}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg border border-cyan text-cyan text-sm font-medium"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
