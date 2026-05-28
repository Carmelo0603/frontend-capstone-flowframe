import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store/store";
import { loadProject, resetProject } from "../store/projectSlice";
import { logout } from "../store/authSlice";
import { flowframeApi } from "../services/api";
import { UserProfile } from "../components/layout/UserProfile";

interface ProjectResponse {
  id: string;
  titolo: string;
  blueprint: string;
}

export function Dashboard() {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await flowframeApi.getMyProjects(token!);
        setProjects(data);
      } catch (error) {
        console.error("Errore recupero progetti:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchProjects();
    }
  }, [token]);

  const handleCreateNew = () => {
    dispatch(resetProject());
    navigate("/workspace");
  };

  const handleOpenProject = (project: ProjectResponse) => {
    const parsedBlueprint = project.blueprint ? JSON.parse(project.blueprint) : [];
    dispatch(
      loadProject({
        id: project.id,
        title: project.titolo,
        blueprint: parsedBlueprint,
      }),
    );
    navigate("/workspace");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Sicuro di voler distruggere questo wireframe?")) return;
    try {
      await flowframeApi.deleteProject(id, token!);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Errore distruzione progetto:", error);
      alert("Errore durante l'eliminazione");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-neutral-100 p-8 font-sans">
      <header className="flex justify-between items-end mb-12 border-b border-neutral-300 pb-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-neutral-900">I TUOI WIREFRAME</h2>
        </div>
        <button
          onClick={handleCreateNew}
          className="bg-neutral-900 text-white px-6 py-2 font-bold text-xs uppercase hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          + Nuovo Progetto
        </button>
      </header>

      {isLoading ? (
        <div className="text-neutral-500 font-mono">[ LOADING DATA... ]</div>
      ) : projects.length === 0 ? (
        <div className="w-full h-64 border-2 border-dashed border-neutral-300 flex items-center justify-center text-neutral-400 font-mono text-sm">
          [ NESSUN PROGETTO TROVATO ]
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white border border-neutral-200 shadow-sm p-6 flex flex-col hover:border-neutral-800 transition-colors group">
              <h3 className="text-lg font-bold text-neutral-900 mb-1 truncate">{project.titolo}</h3>
              <p className="text-xs text-neutral-500 font-mono mb-6">ID: {project.id.split("-")[0]}</p>

              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => handleOpenProject(project)}
                  className="flex-1 bg-neutral-100 text-neutral-900 border border-neutral-200 py-2 text-xs font-bold hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer"
                >
                  APRI
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-4 bg-red-50 text-red-600 border border-red-200 py-2 text-xs font-bold hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <UserProfile></UserProfile>
    </div>
  );
}
