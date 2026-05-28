import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-900 text-neutral-400 py-12 px-8 mt-auto shrink-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="text-2xl font-black tracking-tighter text-white">FLOWFRAME</div>
          <div className="text-xs font-mono opacity-60">LOGIC FIRST, PIXEL SECOND.</div>
        </div>

        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
          <Link to="/filosofia" className="hover:text-white transition-colors">
            Filosofia
          </Link>
          <Link to="/contatti" className="hover:text-white transition-colors">
            Contatti
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-neutral-800 mt-8 pt-8 flex justify-center text-xs font-mono opacity-40">
        © {currentYear} FLOWFRAME. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
