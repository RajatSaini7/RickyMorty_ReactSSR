import React from 'react';

const SideBar = () => {
    return (
        <>
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>FILTERS</span>
            </h6>
            <div id="accordion" className="px-3 mb-4 mb-1 mt-3">
                <div className="card">
                    <div className="card-header px-0 pt-0 pb-0" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"id="headingOne">
                        <h5 className="mb-0">
                            <button className="btn btn-link" >
                                Gender
                            </button>
                        </h5>
                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life  </div>
                        </div>
                </div>
            </div>

            <style jsx>{`
              .card > .card-header button.btn-link:hover {
                  text-decoration: none;
              }
              .card > .card-header button.btn-link {
                color: #000000;
              }
              .card > .card-header:hover {
                  cursor: pointer;
              }
              .card > .card-header {
                background: #cedff1;
              }
            //   .nav .nav-link {
            //     font-weight: 500;
            //     color: #333;
            //   }
              
            //   .nav .nav-link .feather {
            //     margin-right: 4px;
            //     color: #999;
            //   }
              
            //   .nav .nav-link.active {
            //     color: #007bff;
            //   }
              
            //   .nav .nav-link:hover .feather,
            //   .nav .nav-link.active .feather {
            //     color: inherit;
            //   }
              
              .sidebar-heading {
                font-size: 1.2rem;
                text-transform: uppercase;
              }
            
            `}</style>
        </>
    )
};

export default SideBar;