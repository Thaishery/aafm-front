const Nav = ({ path, link }) => {
  return (
    <li className="nav-list-element">
      <a href={path} className="nav-link">
        <div className="nav-link-element">
          {link}
        </div>
      </a>
    </li>
  )
}
export default Nav