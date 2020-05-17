import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const Pagination = (props) => {
  const {
    totalRecords = null,
    pageLimit = 20,
    pageNeighbours = 0,
    currPage,
  } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const LEFT_PAGE = 'LEFT';
  const RIGHT_PAGE = 'RIGHT';

  const totalPages = Math.ceil(totalRecords / pageLimit);

  // pageLimit = typeof pageLimit === 'number' ? pageLimit : 30;
  // totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

  // // pageNeighbours can be: 0, 1 or 2
  // pageNeighbours = typeof pageNeighbours === 'number'
  //     ? Math.max(0, Math.min(pageNeighbours, 2))
  //     : 0;

  useEffect(() => {
    (async () => {
      const page = await fetchPageNumbers();
      // if (page && page.length > 0) {
      setPages(_.cloneDeep(page));
      setCurrentPage(currPage);
    })();
    // }
  }, [totalRecords, currentPage]);

  /**
   * Helper method for creating a range of numbers
   * range(1, 5) => [1, 2, 3, 4, 5]
   */
  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  };

  const fetchPageNumbers = () => {
    const totalPage = totalPages;
    const currentPages = currentPage;
    const pageNeighbour = pageNeighbours;
    // debugger;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbour * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPage > totalBlocks) {
      const startPage = Math.max(2, currentPages - pageNeighbour);
      const endPage = Math.min(totalPage - 1, currentPages + pageNeighbour);

      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPage - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPage];
    }

    return range(1, totalPage);
  };

  const gotoPage = (page) => {
    const currentPage = Math.max(0, Math.min(page, totalPages));

    const paginationData = {
      currentPage,
      totalPages: totalPages,
      pageLimit: pageLimit,
      totalRecords: totalRecords,
    };
    setCurrentPage(currentPage);
    props.onPageChanged(paginationData);
  };

  const handleClick = (page) => (evt) => {
    evt.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = (evt) => {
    evt.preventDefault();
    gotoPage(currentPage - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = (evt) => {
    evt.preventDefault();
    gotoPage(currentPage + pageNeighbours * 2 + 1);
  };

  return (
    <>
      {totalRecords !== 0 && totalPages !== 1 && (
        <nav aria-label="Characters Pagination">
          <ul className="pagination">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Previous"
                      onClick={handleMoveLeft}
                    >
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                );

              if (page === RIGHT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Next"
                      onClick={handleMoveRight}
                    >
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                );

              return (
                <li
                  key={index}
                  className={`page-item${
                    currentPage === page ? ' active' : ''
                  }`}
                >
                  <a className="page-link" href="#" onClick={handleClick(page)}>
                    {page}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      <style jsx>{`
            ul.pagination {
                margin-top: 0;
                margin-bottom: 0;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                justify-content: center;
            } 
            ul.pagination > li.page-item.active > a.page-link {
                    color: saturate(darken($base-color, 50%), 5%) !important;
                    background-color: saturate(lighten($base-color, 7.5%), 2.5%) !important;
                    border-color: #ced4da !important;
                }
              
                ul.pagination > .page-item > a.page-link {
                  padding: 0.75rem 1rem;
                  min-width: 3rem;
                  text-align: center;
                  box-shadow: none !important;
                  border-color: #ced4da !important;
                  color: saturate(darken(#ced4da, 30%), 10%);
                  font-weight: 900;
                  font-size: 1rem;
                }
              
                  ul.pagination > .page-item > a.page-link:hover {
                    background-color: lighten(desaturate($base-color, 50%), 12.5%;
                  }

                  @media (min-width: 576px) { 

                    ul.pagination {
                        justify-content: flex-end;
                    }

                   }
            `}</style>
    </>
  );
};

export default Pagination;
