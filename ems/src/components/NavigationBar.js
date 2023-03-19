import { NavLink } from "react-router-dom";
import classes from "./NavigationBar.module.css";
const NavigationBar = () => {
  return (
    <nav
      class="navbar navbar-expand-lg"
      data-bs-theme="dark"
      style={{ backgroundColor: "black" }}
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img
            src="GEMS.png"
            className={"img-fluid " + classes.logo}
            alt="logo"
          />
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
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  className={classes.dropdown}
                >
                  Employees
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="/">
                      Individual Upload
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/excel">
                      Excel Upload
                    </a>
                  </li>
                </ul>
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
                  <span>
                    Notifications <div className={classes.notification}>4</div>
                  </span>
                </NavLink>
              </li>
              <li class="nav-item"></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
