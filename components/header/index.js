import React from 'react';

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">RickyMorty</a>
                <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" href="#">Sign out</a>
                    </li>
                </ul>
            </nav>
            <style jsx>{`
                .navbar-brand {
                    padding-top: .75rem;
                    padding-bottom: .75rem;
                    font-size: 1rem;
                    background-color: rgba(0, 0, 0, .25);
                    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
                }
                
                .navbar .form-control {
                    padding: .75rem 1rem;
                    border-width: 0;
                    border-radius: 0;
                }
                
                .form-control-dark {
                    color: #fff;
                    background-color: rgba(255, 255, 255, .1);
                    border-color: rgba(255, 255, 255, .1);
                }
                
                .form-control-dark:focus {
                    border-color: transparent;
                    box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
                }
                .form-control:focus {
                    color: #495057;
                    background-color: #fff;
                }
        `}
            </style>
        </>
    );
}

export default Header;