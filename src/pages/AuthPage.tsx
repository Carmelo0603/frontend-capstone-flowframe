import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../store/authSlice";
import { flowframeApi } from "../services/api";

export function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Leggiamo il parametro in arrivo dalla navbar
  const locationIsLogin = location.state?.isLogin;

  // 2. TUTTE le dichiarazioni di stato in cima. Niente variabili fantasma.
  const [prevLocationIsLogin, setPrevLocationIsLogin] = useState(locationIsLogin);
  const [isLogin, setIsLogin] = useState(locationIsLogin !== false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  if (locationIsLogin !== prevLocationIsLogin) {
    setPrevLocationIsLogin(locationIsLogin);
    if (locationIsLogin !== undefined) {
      setIsLogin(locationIsLogin);
      setMessage({ text: "", type: "" });
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      if (isLogin) {
        // --- LOGICA DI LOGIN ---

        const data = await flowframeApi.login({ email, password });

        dispatch(setToken(data.token));
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        // --- LOGICA DI REGISTRAZIONE ---
        await flowframeApi.register({ username, email, password });
        setMessage({
          text: "Identità creata. Controlla la tua casella email per verificare l'account e sbloccare l'accesso.",
          type: "success",
        });

        setUsername("");
        setPassword("");
        setIsLogin(true);
      }
    } catch (error: any) {
      setMessage({ text: error.message || "Errore di comunicazione col server", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] bg-neutral-100 text-neutral-900 p-4">
      <div className="max-w-md w-full bg-white p-8 border border-neutral-200 shadow-sm">
        {/* Intestazione e Switch */}
        <div className="flex justify-between items-end border-b-2 border-neutral-900 pb-2 mb-6">
          <h1 className="text-2xl font-black uppercase tracking-widest">{isLogin ? "System Access" : "New Identity"}</h1>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage({ text: "", type: "" });
            }}
            className="text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            {isLogin ? "Crea Account ->" : "<- Torna al Login"}
          </button>
        </div>

        {/* Messaggi di Sistema */}
        {message.text && (
          <div
            className={`p-3 mb-6 text-xs font-bold uppercase tracking-wider ${
              message.type === "error" ? "bg-red-600 text-white" : "bg-neutral-900 text-white"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Il Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Identificativo (Username)</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-neutral-300 text-sm focus:ring-2 focus:ring-neutral-900 outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Frequenza (Email)</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-neutral-300 text-sm focus:ring-2 focus:ring-neutral-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Chiave di Sicurezza (Password)</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-neutral-300 text-sm focus:ring-2 focus:ring-neutral-900 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest p-3 hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Elaborazione..." : isLogin ? "Inizia Sessione" : "Registra Dati"}
          </button>
        </form>
      </div>
    </div>
  );
}
