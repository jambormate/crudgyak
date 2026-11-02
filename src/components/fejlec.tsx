interface FejlecProps {
    menu: string;
    setMenu: (menu: string) => void;
}

function Fejlec({ menu, setMenu }: FejlecProps) {
    return (
        <header className="bg-dark text-white py-3">
            <nav className="container d-flex gap-3">
                <button className="btn btn-outline-light" onClick={() => setMenu("index")}>
                    Kezdőlap
                </button>
                <button className="btn btn-outline-light" onClick={() => setMenu("admin")}>
                    Admin
                </button>
                <button className="btn btn-outline-light" onClick={() => setMenu("moderator")}>
                    Moderátor
                </button>
            </nav>
        </header>
    );
}

export default Fejlec;