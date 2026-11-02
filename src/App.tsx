import { useState } from "react";
import Fejlec from "./components/fejlec";
import Lablec from "./components/lablec";
import Tablazat from "./components/tablazat";

export interface Tarsasjatek {
  id: number;
  nev: string;
  jatekosok: string;
  ar: number;
  raktaron: boolean;
}

const mintaJatekok: Tarsasjatek[] = [
  { id: 1, nev: "Root: A Game of Woodland Might and Right", jatekosok: "2-4", ar: 28990, raktaron: false },
  { id: 2, nev: "The Heat: Pedal to the Metal", jatekosok: "2-6", ar: 24990, raktaron: true },
  { id: 3, nev: "Gloomhaven", jatekosok: "1-4", ar: 69990, raktaron: true },
  { id: 4, nev: "Settlers of Catan", jatekosok: "3-4", ar: 12990, raktaron: true },
  { id: 5, nev: "Azul", jatekosok: "2-4", ar: 15990, raktaron: false },
];

function App() {
  const [jatekok, setJatekok] = useState<Tarsasjatek[]>(mintaJatekok);
  const [menu, setMenu] = useState("index");

  const [nev, setNev] = useState("");
  const [jatekosok, setJatekosok] = useState("");
  const [ar, setAr] = useState("");
  const [raktaron, setRaktaron] = useState(true);
  const [szerkesztId, setSzerkesztId] = useState(0);

  function mentes() {
    if (nev === "" || jatekosok === "" || ar === "") {
      alert("Minden mezőt tölts ki!");
    }
    else if (szerkesztId === 0) {
      const ujJatek: Tarsasjatek = {
        id: Math.max(0, ...jatekok.map(j => j.id)) + 1,
        nev: nev,
        jatekosok: jatekosok,
        ar: Number(ar),
        raktaron: raktaron
      };

      setJatekok([...jatekok, ujJatek]);
      urites();
    }
    else {
      setJatekok(jatekok.map(j =>
        j.id === szerkesztId
          ? { ...j, nev: nev, jatekosok: jatekosok, ar: Number(ar), raktaron: raktaron }
          : j
      ));

      urites();
    }
  }

  function urites() {
    setNev("");
    setJatekosok("");
    setAr("");
    setRaktaron(true);
    setSzerkesztId(0);
  }

  function szerkesztes(jatek: Tarsasjatek) {
    setNev(jatek.nev);
    setJatekosok(jatek.jatekosok);
    setAr(jatek.ar.toString());
    setRaktaron(jatek.raktaron);
    setSzerkesztId(jatek.id);
  }

  function torles(id: number) {
    setJatekok(jatekok.filter(j => j.id !== id));
  }

  function keszletValtas(id: number) {
    setJatekok(jatekok.map(j =>
      j.id === id ? { ...j, raktaron: !j.raktaron } : j
    ));
  }

  return (
    <>
      <Fejlec menu={menu} setMenu={setMenu} />

      <main className="container my-4">
        {menu === "index" && (
          <section>
            <h1 className="mb-4">Társasjáték webáruház</h1>
            <Tablazat jatekok={jatekok} mod="kezdolap" />
          </section>
        )}

        {menu === "admin" && (
          <section>
            <h1 className="mb-4">Admin felület</h1>

            <article className="card shadow-sm mb-4">
              <div className="card-header">
                <h2 className="h5 mb-0">
                  {szerkesztId === 0 ? "Új társasjáték felvétele" : "Társasjáték szerkesztése"}
                </h2>
              </div>

              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Játék neve</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nev}
                    onChange={e => setNev(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Játékosok száma</label>
                  <input
                    type="text"
                    className="form-control"
                    value={jatekosok}
                    onChange={e => setJatekosok(e.target.value)}
                    placeholder="Például: 2-4"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Ár (Ft)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={ar}
                    onChange={e => setAr(e.target.value)}
                  />
                </div>

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={raktaron}
                    onChange={e => setRaktaron(e.target.checked)}
                  />
                  <label className="form-check-label">Raktáron</label>
                </div>

                <button className="btn btn-success me-2" onClick={mentes}>
                  {szerkesztId === 0 ? "Felvétel" : "Módosítás mentése"}
                </button>

                {szerkesztId !== 0 && (
                  <button className="btn btn-secondary" onClick={urites}>
                    Mégse
                  </button>
                )}
              </div>
            </article>

            <Tablazat
              jatekok={jatekok}
              mod="admin"
              onEdit={szerkesztes}
              onDelete={torles}
            />
          </section>
        )}

        {menu === "moderator" && (
          <section>
            <h1 className="mb-4">Moderátor felület</h1>

            <Tablazat
              jatekok={jatekok}
              mod="moderator"
              onToggle={keszletValtas}
            />
          </section>
        )}
      </main>

      <Lablec />
    </>
  );
}

export default App;
