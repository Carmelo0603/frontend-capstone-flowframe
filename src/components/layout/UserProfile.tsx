import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import { flowframeApi } from "../../services/api";

export function UserProfile() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await flowframeApi.getCurrentUser(token!);
        setUsername(user.username);
        setEmail(user.email);
      } catch (error) {
        console.error("Impossibile caricare l'utente", error);
      }
    };
    if (token) fetchUser();
  }, [token]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await flowframeApi.updateProfile({ username, email }, token!);
      setMessage("Profilo aggiornato con successo!");
    } catch (error) {
      setMessage("Errore durante l'aggiornamento del profilo.");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await flowframeApi.changePassword(
        {
          vecchiaPassword: oldPassword,
          nuovaPassword: newPassword,
        },
        token!,
      );
      setMessage("Password cambiata con successo!");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage("Errore nel cambio password. Verifica i dati.");
    }
  };

  return (
    <div className="bg-white p-6 border border-neutral-200 shadow-sm mt-8">
      <h3 className="text-xl font-black mb-4">Impostazioni Profilo</h3>
      {message && <div className="mb-4 text-xs font-bold p-2 bg-neutral-100">{message}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Anagrafica */}
        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-3">
          <h4 className="text-sm font-bold uppercase text-neutral-500 border-b pb-1">Dati Personali</h4>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 text-sm border focus:ring-1 focus:ring-neutral-900 outline-none"
            placeholder="Username"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 text-sm border focus:ring-1 focus:ring-neutral-900 outline-none"
            placeholder="Email"
          />
          <button type="submit" className="bg-neutral-900 text-white text-xs font-bold p-2 uppercase hover:bg-neutral-800">
            Salva Dati
          </button>
        </form>

        {/* Form Password */}
        <form onSubmit={handleChangePassword} className="flex flex-col gap-3">
          <h4 className="text-sm font-bold uppercase text-neutral-500 border-b pb-1">Sicurezza</h4>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="p-2 text-sm border focus:ring-1 focus:ring-neutral-900 outline-none"
            placeholder="Vecchia Password"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-2 text-sm border focus:ring-1 focus:ring-neutral-900 outline-none"
            placeholder="Nuova Password"
          />
          <button type="submit" className="bg-neutral-900 text-white text-xs font-bold p-2 uppercase hover:bg-neutral-800">
            Cambia Password
          </button>
        </form>
      </div>
    </div>
  );
}
