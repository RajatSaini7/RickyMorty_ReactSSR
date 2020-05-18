import React from 'react';

/**
 * Header Component
 *
 * @summary
 * Provides header area of the application
 *
 * @param props
 *
 * @returns {React.FC}
 */
const Header = (props) => {
  const { searchByName, searchInput, searchInputFunc } = props;

  return (
    <>
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
          RickyMorty
        </a>
        <form className="w-100 form-position" onSubmit={searchByName}>
          <input
            type="text"
            defaultValue={searchInput}
            className="form-control form-control-dark w-100"
            onChange={searchInputFunc}
            placeholder="Search By Name"
            aria-label="Search"
          />
          <i
            className="fa fa-search"
            onClick={searchByName}
            aria-hidden="true"
          ></i>
        </form>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link" href="#">
              SIGN OUT
            </a>
          </li>
        </ul>
      </nav>
      <style jsx>
        {`
          a.navbar-brand {
            font-size: 1.5em;
          }
          a.navbar-brand:hover {
            color: #495057;
          }
          .navbar-brand {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            font-size: 1rem;
            background-color: rgba(0, 0, 0, 0.25);
            box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
          }

          .navbar .form-control {
            padding: 0.75rem 1rem;
            border-width: 0;
            border-radius: 0;
          }

          .form-control-dark {
            color: #fff;
            background-color: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.1);
          }

          .form-control-dark:focus {
            border-color: transparent;
            box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
          }
          .form-control:focus {
            color: #495057;
            background-color: #fff;
          }
          .form-position {
            position: relative;
          }
          .fa-search {
            position: absolute;
            right: 1.6em;
            top: 0.5em;
            font-size: 1.4em;
            color: white !important;
          }
          .fa-search:hover {
            cursor: pointer;
          }
          .form-control.form-control-dark:focus + .fa-search {
            color: black !important;
          }
        `}
      </style>
    </>
  );
};

export default Header;
