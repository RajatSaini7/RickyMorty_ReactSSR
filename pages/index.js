import Head from 'next/head';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header, CardComponent, Pagination, SortComponent } from '../components';



export default function Home() {

  const [charactersList, setCharactersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [ currentSortValue, setCurrentSortValue ] = useState('');

  useEffect(() => {
    getCharactersList(1);
  }, []);

  const getCharactersList = (pageNo) => {
    axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNo}`).
      then((res) => {
        if (res) {
          setTotalRecords(res.data.info.count);
          handleSort(currentSortValue,res.data.results);
          // setCharactersList(_.cloneDeep(res.data.results));
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const onPageChanged = data => {
    // console.log(data, "dsvfs");
    const { currentPage, totalPages, pageLimit } = data;
    setCurrentPage(currentPage);
    const list = getCharactersList(currentPage);
    // if (list) {
    //   setTotalRecords(list.info.count);
    //   setCharactersList(list.results);
    // }
  }

  const sortList = (event) => {
    setCurrentSortValue(event.target.value);
    handleSort(event.target.value, charactersList);
  }

  const handleSort = (sortVal, originalLists) => {
    let sortValue;
    if(sortVal.length !== 0) {
      sortValue = sortVal;
    }
    else {
      sortValue = currentSortValue;
    }
    let list = originalLists;
    if (sortValue === 'Ascending') {
      setCurrentSortValue('Ascending');
      if (list && list.length > 0) {
        const newList = list.sort((a,b) => {
          return a.id - b.id;
        });
        setCharactersList(_.cloneDeep(newList));
      }
    }
    else if (sortValue === 'Descending') {
      setCurrentSortValue('Descending');
      if (list && list.length > 0) {
        const newList = list.sort((a,b) => {
          return b.id - a.id;
        });
        setCharactersList(_.cloneDeep(newList));
      }
    }
    else {
      setCurrentSortValue('');
      // setCharactersList(_.cloneDeep(originalLists));
      sortById(currentPage);
    }
  };

  const sortById = (pageNo) => {
    axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNo}`).
      then((res) => {
        if (res) {
          setTotalRecords(res.data.info.count);
          setCharactersList(_.cloneDeep(res.data.results));
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };


  return (
    <div className="containers">
      <Head>
        <title>RickyMorty App</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin='anonymous'
        />
      </Head>

      <Header />

      <div className="container-fluid">
        <div className="row">

          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    <span data-feather="home"></span>
                  Dashboard <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="file"></span>
                  Orders
                </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="shopping-cart"></span>
                  Products
                </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="users"></span>
                  Customers
                </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="bar-chart-2"></span>
                  Reports
                </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="layers"></span>
                  Integrations
                </a>
                </li>
              </ul>

              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Saved reports</span>
                <a className="d-flex align-items-center text-muted" href="#">
                  <span data-feather="plus-circle"></span>
                </a>
              </h6>
              <ul className="nav flex-column mb-2">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="file-text"></span>
                  Current month
                </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="file-text"></span>
                  Last quarter
                </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="file-text"></span>
                  Social engagement
                </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="file-text"></span>
                  Year-end sale
                </a>
                </li>
              </ul>
            </div>
          </nav>

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">

            <div className="container">
              <div className="row justify-content-between align-items-center pb-2 mb-3">
                <div className="col-md-2">
                  <h1 className="h2">Characters</h1>
                </div>
                <div className="col-md-2">
                  <SortComponent sortList={sortList}/>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                {totalRecords && totalRecords > 0 && charactersList.map(character => (
                  // <div classN="card-deck">
                  <CardComponent
                    key={character.id}
                    character={character}
                  />
                  // </div>
                ))}
              </div>
              <div className="row pagination-row">
                <div className="col-md-12">
                  <Pagination
                    totalRecords={totalRecords}
                    pageLimit={20}
                    pageNeighbours={1}
                    onPageChanged={onPageChanged}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>


      {/* <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer> */}

      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>

      <style jsx>{`
        .containers {
          min-height: 100vh;
        }

        .pagination-row {
          position: sticky;
          bottom: 0;
          background: #fff;
          z-index: 999;
          padding: 15px 0;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        // .description {
        //   line-height: 1.5;
        //   font-size: 1.5rem;
        // }

        // code {
        //   background: #fafafa;
        //   border-radius: 5px;
        //   padding: 0.75rem;
        //   font-size: 1.1rem;
        //   font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
        //     DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        // }

        // .grid {
        //   display: flex;
        //   align-items: center;
        //   justify-content: center;
        //   flex-wrap: wrap;

        //   max-width: 800px;
        //   margin-top: 3rem;
        // }

        // .card {
        //   margin: 1rem;
        //   flex-basis: 45%;
        //   padding: 1.5rem;
        //   text-align: left;
        //   color: inherit;
        //   text-decoration: none;
        //   border: 1px solid #eaeaea;
        //   border-radius: 10px;
        //   transition: color 0.15s ease, border-color 0.15s ease;
        // }

        // .card:hover,
        // .card:focus,
        // .card:active {
        //   color: #0070f3;
        //   border-color: #0070f3;
        // }

        // .card h3 {
        //   margin: 0 0 1rem 0;
        //   font-size: 1.5rem;
        // }

        // .card p {
        //   margin: 0;
        //   font-size: 1.25rem;
        //   line-height: 1.5;
        // }

        // .logo {
        //   height: 1em;
        // }

        // main {
          // padding: 5rem 0;
          // flex: 1;
          // display: flex;
          // flex-direction: column;
          // justify-content: center;
          // align-items: center;
        // }

        // footer {
        //   width: 100%;
        //   height: 100px;
        //   border-top: 1px solid #eaeaea;
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        // }

        // footer img {
        //   margin-left: 0.5rem;
        // }

        // footer a {
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        // }

        // @media (max-width: 600px) {
        //   .grid {
        //     width: 100%;
        //     flex-direction: column;
        //   }
        // }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
