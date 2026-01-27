
import { NavLink } from 'react-router-dom';
import './Navbar.css';
export function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/SuperMarket" activeClassName="active">SuperMarket</NavLink>
        </li>
        <li>
          <NavLink to="/Cart" activeClassName="active">Cart</NavLink>
        </li>
        <li>
          <NavLink to="/Checkout" activeClassName="active">Checkout</NavLink>
        </li>
        <li>
          <NavLink to="/Additems" activeClassName="active">Add Items</NavLink>
        </li>
      </ul>
    </nav>

  );
}
