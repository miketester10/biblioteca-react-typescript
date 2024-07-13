import { Link } from 'react-router-dom';

const PaginaNonTrovata = () => {
  return (
    <div>
      <h1>404 - Pagina non trovata</h1>
      <p>La pagina che stai cercando non è disponibile.</p>
      
      <Link to="/" className="btn-404">Torna alla Home</Link>
    </div>
  );
};

export default PaginaNonTrovata;
