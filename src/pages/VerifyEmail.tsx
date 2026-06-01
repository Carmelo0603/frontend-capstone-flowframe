import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { flowframeApi } from "../services/api";

export function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!code) {
      setStatus("error");
      return;
    }

    const verify = async () => {
      try {
        await flowframeApi.verifyEmail(code);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };

    verify();
  }, [code]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 text-neutral-900 p-4">
      <div className="max-w-md w-full bg-white p-8 border border-neutral-200 shadow-sm text-center">
        <h1 className="text-2xl font-black uppercase tracking-widest mb-6 border-b-2 border-neutral-900 pb-2">System Access</h1>

        {status === "loading" && <p className="text-sm font-mono text-neutral-500 uppercase tracking-wider animate-pulse">Verifica credenziali in corso...</p>}

        {status === "success" && (
          <div>
            <div className="bg-neutral-900 text-white p-3 mb-6 text-xs font-bold uppercase tracking-wider">Autenticazione Verificata</div>
            <p className="text-sm text-neutral-600 mb-6">La tua identità è stata confermata. Il sistema è ora sbloccato.</p>
            <Link
              to="/login"
              className="inline-block w-full bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest p-3 hover:bg-neutral-800 transition-colors"
            >
              Procedi al Login
            </Link>
          </div>
        )}

        {status === "error" && (
          <div>
            <div className="bg-red-600 text-white p-3 mb-6 text-xs font-bold uppercase tracking-wider">Anomalia Rilevata</div>
            <p className="text-sm text-neutral-600 mb-6">Il codice di verifica è mancante, non valido o scaduto.</p>
            <Link
              to="/register"
              className="inline-block w-full border border-neutral-900 text-neutral-900 text-xs font-bold uppercase tracking-widest p-3 hover:bg-neutral-50 transition-colors"
            >
              Richiedi Nuovo Accesso
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
