const API_URL = "https://quixotic-edie-carmelo-fdd85a3b.koyeb.app";

export const flowframeApi = {
  login: async (credentials: Record<string, string>) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login fallito");
    }

    return response.json();
  },

  register: async (userData: Record<string, string>) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Errore durante la registrazione");
    }
    return response.json();
  },

  verifyEmail: async (code: string) => {
    const response = await fetch(`${API_URL}/auth/verify?code=${code}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Codice di verifica non valido o scaduto");
    }

    return response.text();
  },

  createProject: async (title: string, token: string) => {
    const response = await fetch(`${API_URL}/api/progetti`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ titolo: title }),
    });

    if (!response.ok) {
      throw new Error("Errore creazione progetto");
    }

    return response.json();
  },

  updateBlueprint: async (projectId: string, blueprintStr: string, token: string) => {
    const response = await fetch(`${API_URL}/api/progetti/${projectId}/blueprint`, {
      method: "PUT",
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Bearer ${token}`,
      },
      body: blueprintStr,
    });

    if (!response.ok) {
      throw new Error("Errore salvataggio blueprint");
    }

    return response.json();
  },

  getMyProjects: async (token: string) => {
    const response = await fetch(`${API_URL}/api/progetti/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Errore recupero progetti");
    return response.json();
  },

  deleteProject: async (projectId: string, token: string) => {
    const response = await fetch(`${API_URL}/api/progetti/${projectId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Errore eliminazione progetto");
  },
  getUxResources: async (category?: string) => {
    const url = category && category !== "All" ? `${API_URL}/api/ux-resources?category=${encodeURIComponent(category)}` : `${API_URL}/api/ux-resources`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Errore recupero risorse UX dal server");
    return response.json();
  },

  getUxSummary: async (resourceId: number, currentProjectDescription: string) => {
    const response = await fetch(`${API_URL}/api/ux-resources/${resourceId}/summary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ currentProjectDescription }),
    });

    if (!response.ok) throw new Error("Errore recupero insight IA dal server");
    return response.json();
  },

  getCurrentUser: async (token: string) => {
    const response = await fetch(`${API_URL}/api/utenti/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Errore recupero utente");
    return response.json();
  },

  updateProfile: async (userData: { username: string; email: string }, token: string) => {
    const response = await fetch(`${API_URL}/api/utenti/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Errore aggiornamento profilo");
    return response.json();
  },

  changePassword: async (passwordData: Record<string, string>, token: string) => {
    const response = await fetch(`${API_URL}/api/utenti/me/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    });
    if (!response.ok) throw new Error("Errore cambio password");
    return response.json();
  },
};
