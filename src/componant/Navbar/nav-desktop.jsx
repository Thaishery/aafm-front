const NavDesktop = ({ navElements }) => {
  return (
    <>
      <nav>
        <ul className="nav-desktop-element-container">
          {navElements.map((element) => (
            <li key={element.link} className="nav-desktop-element">
              <a href={element.path} className="nav-desktop-link">
              <div className="nav-desktop-link-container">
                {element.link}
              </div>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
export default NavDesktop