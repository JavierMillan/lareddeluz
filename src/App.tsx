import { useEffect, useState } from "react";
import Despega from "./pages/Despega";

/**
 * Enrutado mínimo por pathname. GitHub Pages no tiene servidor que
 * reescriba rutas, así que cada ruta real necesita su propio HTML en
 * el build (ver vite.config: input). Aquí sólo decidimos qué pintar.
 */
export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  if (path.startsWith("/despega")) return <Despega />;

  // La home sigue sirviéndose como HTML estático durante la migración.
  return <Despega />;
}
