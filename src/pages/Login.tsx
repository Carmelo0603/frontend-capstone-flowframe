import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../store/authSlice";
import { flowframeApi } from "../services/api";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await flowframeApi.login({ email, password });
      dispatch(setToken(response.token));
      navigate("/workspace");
    } catch (err) {
      setError("Accesso negato. Controlla le credenziali.");
    }
  };

  return (
    <div className="flex h-screen w-full bg-neutral-100 items-center justify-center font-sans">
      <div className="w-96 bg-white border border-neutral-200 shadow-xl p-8 rounded-sm">
        <h1 className="text-3xl font-black tracking-tighter text-neutral-900 mb-1">FLOWFRAME</h1>
        <p className="text-sm text-neutral-500 uppercase tracking-wider font-semibold mb-8">System Access</p>

        {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-neutral-800 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-sm p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-neutral-800 outline-none"
              required
            />
          </div>
          <button type="submit" className="mt-4 w-full bg-neutral-900 text-white font-semibold py-2 rounded-md hover:bg-neutral-800 transition-colors">
            ENTER
          </button>
        </form>
      </div>
    </div>
  );
}
