import React, { useEffect } from 'react';

const SideBar = (props) => {
  const { filterList, onFilterClicked } = props;

  useEffect(() => {
    console.log(filterList, 'filterList');
  }, [filterList]);

  return (
    <>
      <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>FILTERS</span>
      </h6>
      <div id="accordion" className="px-3 mb-4 mb-1 mt-3">
        <div className="card">
          <div className="card-header px-0 pt-0 pb-0" id="headingOne">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Gender
              </button>
            </h5>
          </div>
          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            {Object.keys(filterList.passingTags.gender).map((el, index) => (
              <div className="card-body" key={`gender_${index}`}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={filterList.passingTags.gender[el]}
                    onChange={(e) => onFilterClicked(e, 'gender')}
                    value="true"
                    id={`gender${index}`}
                    name={el}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`gender${index}`}
                  >
                    {el}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header px-0 pt-0 pb-0" id="headingTwo">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                Species
              </button>
            </h5>
          </div>
          <div
            id="collapseTwo"
            className="collapse show"
            aria-labelledby="headingTwo"
            data-parent="#accordion"
          >
            {Object.keys(filterList.passingTags.species).map((el, index) => (
              <div className="card-body" key={`species_${index}`}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={filterList.passingTags.species[el]}
                    onChange={(e) => onFilterClicked(e, 'species')}
                    value="true"
                    id={`species${index}`}
                    name={el}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`species${index}`}
                  >
                    {el}
                  </label>
                </div>
              </div>
            ))}
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
        .card-body {
          padding: 0.5em;
        }
        .card-body .form-check {
          overflow: hidden;
          word-break: break-word;
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
  );
};

export default SideBar;
