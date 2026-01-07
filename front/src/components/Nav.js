import { Link } from "react-router-dom";

export default function NavMenu({onLogout}) {

  const handleLogout = () => {
    onLogout();
  }

  return (
    <nav
      style={{
        backgroundColor: "#ccc",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        gap: "20px"
      }}
    >
      <div style={{display:"flex", gap:"20px"}}>
        <Link to="/">List</Link>
        <Link to="/paginate">Paginated Games</Link>
      </div>
      <div>
         <button
          onClick={handleLogout}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0,
            font: "inherit",
          }}
        >
          Logout
      </button>
      </div>
      
      
    </nav>
  );
}
