import { useState } from "react";

export function Contatti() {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("Messaggio ricevuto. Il sistema elaborerà la tua richiesta.");
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] bg-neutral-100 text-neutral-900 font-sans p-8">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">
            Inizia il
            <br />
            Dialogo.
          </h1>
          <p className="text-sm text-neutral-600 mb-8 max-w-sm">
            FLOWFRAME è un progetto in continua evoluzione. Se vuoi discutere di architettura dell'informazione, logica generativa o opportunità di
            collaborazione, i canali sono aperti.
          </p>

          <div className="space-y-4 text-xs font-mono text-neutral-500 uppercase tracking-widest">
            <div>
              <strong className="block text-neutral-900 mb-1">HQ Operativo</strong>
              Sommatino (CL), Sicilia
              <br />
              Remote Workspace
            </div>
            <div>
              <strong className="block text-neutral-900 mb-1">Sviluppo & Design</strong>
              Carmelo Provenzani
              <br />
              Full Stack Web Developer & Visual Designer
            </div>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 p-8 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-widest mb-6 border-b border-neutral-200 pb-2">System Comm Link</h2>

          {status && <div className="mb-6 p-3 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider text-center">{status}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Nome / Identificativo</label>
              <input type="text" required className="w-full p-2 border border-neutral-300 text-sm focus:ring-2 focus:ring-neutral-900 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Frequenza Email</label>
              <input type="email" required className="w-full p-2 border border-neutral-300 text-sm focus:ring-2 focus:ring-neutral-900 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Payload (Messaggio)</label>
              <textarea
                required
                rows={4}
                className="w-full p-2 border border-neutral-300 text-sm focus:ring-2 focus:ring-neutral-900 outline-none resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest p-3 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Trasmetti Dati
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
