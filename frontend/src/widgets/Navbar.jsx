import { Link } from "react-router-dom";
import { FaBook } from "react-icons/fa";

function Navbar() {
    return (
        <nav style={{ 
            display: 'flex', 
            flexDirection: 'row',
            justifyContent: 'space-between', 
            alignItems: 'center', 
            width: "100%",
            padding: "15px",
        }}>
            <div></div>
            <h2><Link style={{ textDecoration: "none", color: "black", fontWeight: 600 }} to="/">memora.</Link></h2>
            <FaBook size={30}/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        </nav>
    );
}

export default Navbar