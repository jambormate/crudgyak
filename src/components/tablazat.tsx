import type { Tarsasjatek } from "../App";
 
interface TablazatProps {
  jatekok: Tarsasjatek[];
  mod?: "kezdolap" | "admin" | "moderator";
  onEdit?: (jatek: Tarsasjatek) => void;
  onDelete?: (id: number) => void;
  onToggle?: (id: number) => void;
}
 
 
function Tablazat({ jatekok, mod = "kezdolap", onEdit, onDelete, onToggle }: TablazatProps) {
  const cim = mod === "admin" ? "Rekordok" : mod === "moderator" ? "Játékok és készlet" : "Játéklista";
 
  return (
    <article className="card shadow-sm">
      <div className="card-header d-flex align-items-center justify-content-between p-3 p-md-4">
        <div>
          <h2 className="h5 mb-1">{cim}</h2>
          <span className="text-secondary small">{jatekok.length} társasjáték</span>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Társasjáték</th>
              <th scope="col">Játékosok</th>
              <th scope="col">Ár</th>
              <th scope="col">Állapot</th>
              {mod === "admin" && <th scope="col" className="text-end">Műveletek</th>}
              {mod === "moderator" && <th scope="col" className="text-end">Készlet kezelése</th>}
            </tr>
          </thead>
          <tbody>
            {jatekok.length === 0 ? (
              <tr><td colSpan={mod === "kezdolap" ? 4 : 5} className="text-center text-secondary p-4">Még nincs megjeleníthető társasjáték.</td></tr>
            ) : jatekok.map((jatek) => (
              <tr key={jatek.id}>
                <th scope="row" className="fw-semibold">{jatek.nev}</th>
                <td>{jatek.jatekosok} fő</td>
                <td className="text-nowrap">{jatek.ar} Ft</td>
                <td><span className={`badge rounded-pill ${jatek.raktaron ? "text-bg-success" : "text-bg-secondary"}`}>{jatek.raktaron ? "Raktáron" : "Elfogyott"}</span></td>
                {mod === "admin" && (
                  <td className="text-end text-nowrap">
                    <button type="button" className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit?.(jatek)} aria-label={`${jatek.nev} szerkesztése`}>Szerkesztés</button>
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onDelete?.(jatek.id)} aria-label={`${jatek.nev} törlése`}>Törlés</button>
                  </td>
                )}
                {mod === "moderator" && (
                  <td className="text-end">
                    <button type="button" className={`btn btn-sm ${jatek.raktaron ? "btn-outline-secondary" : "btn-success"}`} onClick={() => onToggle?.(jatek.id)} aria-label={`${jatek.nev} ${jatek.raktaron ? "készletből kivétele" : "készletre helyezése"}`}>
                      {jatek.raktaron ? "Készletről le" : "Készletre"}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
 
export default Tablazat;