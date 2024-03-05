import { Link } from "react-router-dom"

const Nav = ({ path, link }) => {
  return (
    <li className="nav-list-element">
      <Link to={path} className="nav-link">
        <div className="nav-link-element">
          {link}
        </div>
      </Link>
    </li>
  )
}
export default Nav