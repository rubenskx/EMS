import { NavLink } from "react-router-dom";
import classes from "./NavigationBar.module.css";
import {MdOutlineNotificationsActive } from "react-icons/md";
import { RxExit } from "react-icons/rx";
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
                  <span style={{ color: "grey" }}>Employees</span>
                </a>
                <ul class="dropdown-menu" style={{ backgroundColor: "black" }}>
                  <li>
                    <div class="dropdown-item">
                      <NavLink
                        to="/excel"
                        className={({ isActive }) =>
                          (isActive ? classes.active + " " : " ") +
                          classes.links
                        }
                      >
                        Excel
                      </NavLink>
                    </div>
                    <div class="dropdown-item">
                      <NavLink
                        to="/increment"
                        className={({ isActive }) =>
                          (isActive ? classes.active + " " : " ") +
                          classes.links
                        }
                      >
                        Salary Increment
                      </NavLink>
                    </div>
                    <div class="dropdown-item">
                      <NavLink
                        to="/upload"
                        className={({ isActive }) =>
                          (isActive ? classes.active + " " : " ") +
                          classes.links
                        }
                      >
                        Individual Upload
                      </NavLink>
                    </div>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <NavLink
                  to="/search-form"
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
                    <MdOutlineNotificationsActive size={30} />
                  </span>
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  to="/logout"
                  className={({ isActive }) =>
                    (isActive ? classes.active + " " : " ") + classes.links
                  }
                >
                  <span>
                    <RxExit size={30} />
                  </span>
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
