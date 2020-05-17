import React, { useEffect } from 'react';

const SideBar = (props) => {
    const { filterList } = props;

    const rowFilter = (keyObj) => {
        let arr1 = [];

        for (const property1 in keyObj) {
            arr1.push(
                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultChecked={[keyObj][property1]} value="true" id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                {property1}
                            </label>
                        </div>
                    </div>
                </div>
            )
        }

        return arr1;
    }

    const createHeaderFilter = (filterList) => {
        let arr = [];

        for (const property in filterList) {
            if ([property] === 'gender') {
                arr.push(
                    <div className="card">
                        <div className="card-header px-0 pt-0 pb-0" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="headingOne">
                            <h5 className="mb-0">
                                <button className="btn btn-link" >
                                    Gender
                </button>
                            </h5>
                        </div>
                        {
                            rowFilter(filterList[property])
                        }

                    </div>
                )
            }
        }
        return arr;
    }

    return (
        <>
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>FILTERS</span>
            </h6>
            <div id="accordion" className="px-3 mb-4 mb-1 mt-3">
                {
                    createHeaderFilter(filterList.passingTags)
                    // Object.keys(filterList.passingTags) && Object.keys(filterList.passingTags).forEach((key, index) => {
                    //     if ([key] === 'gender') {
                    //         <div className="card">
                    //             <div className="card-header px-0 pt-0 pb-0" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="headingOne">
                    //                 <h5 className="mb-0">
                    //                     <button className="btn btn-link" >
                    //                         Gender
                    //         </button>
                    //                 </h5>
                    //             </div>
                    //             {
                    //                 Object.keys([key]).forEach((keys, index) => {
                    //                     <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    //                         <div className="card-body">
                    //                             <div className="form-check">
                    //                                 <input className="form-check-input" type="checkbox" defaultChecked={[key][keys]} value="true" id="defaultCheck1" />
                    //                                 <label className="form-check-label" htmlFor="defaultCheck1">
                    //                                     [keys]
                    //                     </label>
                    //                             </div>
                    //                         </div>
                    //                     </div>
                    //                 })
                    //             }

                    //         </div>
                    //     }
                    // })
                }
            </div>
            {/* <div className="card">
                    <div className="card-header px-0 pt-0 pb-0" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="headingOne">
                        <h5 className="mb-0">
                            <button className="btn btn-link" >
                                Gender
                            </button>
                        </h5>
                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" defaultChecked={} value="true" id="defaultCheck1" />
                                <label className="form-check-label" for="defaultCheck1">
                                  
                                </label>
                            </div> 
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header px-0 pt-0 pb-0" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" id="headingTwo">
                        <h5 className="mb-0">
                            <button className="btn btn-link" >
                                Species
                            </button>
                        </h5>
                    </div>

                    <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life  </div>
                    </div>
                </div> */}
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