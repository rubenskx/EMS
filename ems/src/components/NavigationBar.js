import { NavLink } from "react-router-dom";
import classes from "./NavigationBar.module.css";
const NavigationBar = () => {
  return (
    <nav
      class="navbar bg-dark navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div className={classes.navlinks}>
            <ul class="navbar-nav">
              <li class="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    (isActive ? classes.active + " " : "") + classes.links
                  }
                >
                  Home
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  to="/search"
                  className={({ isActive }) =>
                    (isActive ? classes.active + " " : " ") + classes.links
                  }
                >
                  Search
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  to="/notifications"
                  className={({ isActive }) =>
                    (isActive ? classes.active + " " : " ") + classes.links
                  }
                >
                  Notifications
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
