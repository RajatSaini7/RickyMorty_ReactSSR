import Head from 'next/head';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Header,
  CardComponent,
  Pagination,
  SortComponent,
  SideBar,
} from '../components';

export default function Home() {
  const [charactersList, setCharactersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentSortValue, setCurrentSortValue] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filterList, setFilterList] = useState({
    // tags that render are inside of 'passingTags' object.
    passingTags: {
      gender: {},
      species: {},
    },
  });
  const BASE_API = 'https://rickandmortyapi.com/api/character/';

  useEffect(() => {
    getCharactersList(1);
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const collectedTrueKeys = await filterClientSideData(filterList);
  //     const filteredArray = await multiPropsFilter(
  //       charactersList,
  //       collectedTrueKeys
  //     );
  //     setCharactersList(filteredArray);
  //   })();
  // }, [filterList]);

  const multiPropsFilter = (products, filters) => {
    const filterKeys = Object.keys(filters);
    return products.filter((product) => {
      return filterKeys.every((key) => {
        if (!filters[key].length) return true;
        // Loops again if product[key] is an array (for material attribute).
        if (Array.isArray(product[key])) {
          return product[key].some((keyEle) => filters[key].includes(keyEle));
        }
        return filters[key].includes(product[key]);
      });
    });
  };

  const getAPIPath = (apiPth) => {
    let apiPath = apiPth;
    if (searchInput.length > 0) {
      apiPath = apiPath + `&name=${searchInput}`;
    }
    if (
      Object.keys(filterList) &&
      Object.keys(filterList.passingTags).length > 0
    ) {
      const { gender, species } = filterList.passingTags;
      for (let genderKey in gender) {
        if (gender[genderKey]) {
          apiPath = apiPath + `&gender=${genderKey}`;
        }
      }
      for (let speciesKey in species) {
        if (species[speciesKey]) {
          apiPath = apiPath + `&species=${speciesKey}`;
        }
      }
    }

    return apiPath;
  };

  const getCharactersList = async (pageNo) => {
    let apiPath = `${BASE_API}?page=${pageNo}`;

    apiPath = await getAPIPath(apiPath);
    axios
      .get(apiPath)
      .then((res) => {
        if (res) {
          setTotalRecords(res.data.info.count);
          if (res.data.results.length > 0) {
            getSpecies(res.data.results);
          }
          // handleSort(currentSortValue,res.data.results,flag);
          // setCharactersList(_.cloneDeep(res.data.results));
          if (currentSortValue === '') {
            setCharactersList(_.cloneDeep(res.data.results));
          } else {
            handleSort(currentSortValue, res.data.results);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setCharactersList([]);
        setTotalRecords(0);
      });
  };

  const onPageChanged = (data) => {
    // console.log(data, "dsvfs");
    const { currentPage, totalPages, pageLimit } = data;
    setCurrentPage(currentPage);
    const list = getCharactersList(currentPage);
    // if (list) {
    //   setTotalRecords(list.info.count);
    //   setCharactersList(list.results);
    // }
  };

  const sortList = (event) => {
    setCurrentSortValue(event.target.value);
    handleSort(event.target.value, charactersList);
  };

  const handleSort = (sortValue, originalLists) => {
    // let sortValue;
    // if(sortVal === '') {
    //   sortValue = sortVal;
    // }
    // else {
    //   sortValue = sortVal;
    // }
    let list = originalLists;
    if (sortValue === 'Ascending') {
      setCurrentSortValue('Ascending');
      if (list && list.length > 0) {
        const newList = list.sort((a, b) => {
          return a.id - b.id;
        });
        setCharactersList(_.cloneDeep(newList));
      }
    } else if (sortValue === 'Descending') {
      setCurrentSortValue('Descending');
      if (list && list.length > 0) {
        const newList = list.sort((a, b) => {
          return b.id - a.id;
        });
        setCharactersList(_.cloneDeep(newList));
      }
    }
    // else if(flag == true) {
    //   setCurrentSortValue('');
    //   setCharactersList(_.cloneDeep(originalLists));
    // }
    else {
      // setCurrentSortValue('');
      // setCharactersList(_.cloneDeep(originalLists));
      sortById(currentPage);
      // getCharactersList(currentPage)
    }
  };

  const sortById = (pageNo) => {
    let apiPath = `${BASE_API}?page=${pageNo}`;
    if (searchInput.length > 0) {
      apiPath = apiPath + `&name=${searchInput}`;
    }
    axios
      .get(apiPath)
      .then((res) => {
        if (res) {
          setTotalRecords(res.data.info.count);
          setCharactersList(_.cloneDeep(res.data.results));
        }
      })
      .catch((error) => {
        console.log(error);
        setCharactersList([]);
        setTotalRecords(0);
      });
  };

  const searchByName = (event) => {
    event.preventDefault();
    let apiPath = `${BASE_API}?page=${1}`;
    if (searchInput.length > 0) {
      apiPath = apiPath + `&name=${searchInput}`;
    }
    setCurrentPage(1);
    setCurrentSortValue('');
    axios
      .get(apiPath)
      .then((res) => {
        if (res) {
          setTotalRecords(res.data.info.count);
          setCharactersList(_.cloneDeep(res.data.results));
          if (res.data.results.length > 0) {
            getSpecies(res.data.results);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setCharactersList([]);
        setTotalRecords(0);
      });
  };

  const searchInputFunc = (event) => {
    setSearchInput(event.target.value);
  };

  const getSpecies = (dataList) => {
    let charList = dataList;
    let genderObj = {};
    let speciesObj = {};

    const speciesList = [...new Set(charList.map((item) => item.species))];
    const genderList = [...new Set(charList.map((item) => item.gender))];

    if (speciesList.length > 0) {
      speciesList.forEach((ele) => {
        speciesObj[ele] = false;
      });
    }
    if (genderList.length > 0) {
      genderList.forEach((ele) => {
        genderObj[ele] = false;
      });
    }

    setFilterList((prevState) => ({
      passingTags: {
        ...prevState.passingTags,
        gender: genderObj,
        species: speciesObj,
      },
    }));
  };

  const onFilterClicked = (e, filterProp) => {
    const name = e.target.name;
    setFilterList((prevState) => ({
      passingTags: {
        ...prevState.passingTags,
        [filterProp]: {
          ...prevState.passingTags[filterProp],
          [name]: !prevState.passingTags[filterProp][name],
        },
      },
    }));

    // getCharactersList(currentPage);
    // const collectedTrueKeys = await filterClientSideData(filterList);
    // debugger;
    // const filteredArray = await multiPropsFilter(
    //   charactersList,
    //   collectedTrueKeys
    // );
    // setCharactersList(filteredArray);
  };

  const filterClientSideData = () => {
    const collectedTrueKeys = {
      gender: [],
      species: [],
    };

    const { gender, species } = filterList.passingTags;
    for (let speciesKey in species) {
      if (species[speciesKey]) collectedTrueKeys.species.push(speciesKey);
    }
    for (let genderKey in gender) {
      if (gender[genderKey]) collectedTrueKeys.gender.push(genderKey);
    }
    // console.log(collectedTrueKeys, 'vsdsdvsd');
    return collectedTrueKeys;
  };

  return (
    <div className="containers">
      <Head>
        <title>RickyMorty App</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <link
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
          integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
          crossOrigin="anonymous"
        />
      </Head>

      <Header
        searchByName={searchByName}
        searchInputFunc={searchInputFunc}
        searchInput={searchInput}
      />

      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 col-sm-2 d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <SideBar
                filterList={filterList}
                onFilterClicked={onFilterClicked}
              />
            </div>
          </nav>

          <main
            role="main"
            className="col-md-10 col-sm-10 ml-sm-auto col-lg-10 pt-3 px-4"
          >
            <div className="container">
              <div className="row justify-content-between align-items-center pb-2 mb-3">
                <div className="col-md-2">
                  <h1 className="h2">Characters</h1>
                </div>
                <div className="col-md-3">
                  <SortComponent
                    sortList={sortList}
                    currentSortValue={currentSortValue}
                  />
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                {totalRecords > 0 &&
                  charactersList
                    .filter((el) => {
                      const obj = filterClientSideData();
                      if (
                        !(obj.gender?.length > 0 || obj.species?.length > 0)
                      ) {
                        return el;
                      } else {
                        if (
                          obj.gender.indexOf(el.gender) >= 0 ||
                          obj.species.indexOf(el.species) >= 0
                        ) {
                          return el;
                        }
                      }
                    })
                    .map((character) => (
                      <CardComponent key={character.id} character={character} />
                    ))}
              </div>
              <div className="row pagination-row">
                <div className="col-md-12">
                  <Pagination
                    totalRecords={totalRecords}
                    pageLimit={20}
                    pageNeighbours={1}
                    onPageChanged={onPageChanged}
                    currPage={currentPage}
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

      <script
        src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossOrigin="anonymous"
      ></script>

      <style jsx>{`
      .containers {
        min- height: 100vh;
  }

        .pagination-row {
    position: sticky;
    bottom: 0;
    background: #fff;
    z - index: 999;
    padding: 15px 0;
  }

  a {
    color: inherit;
    text - decoration: none;
  }

        .title a {
    color: #0070f3;
    text - decoration: none;
  }

        .title a: hover,
        .title a: focus,
        .title a: active {
    text - decoration: underline;
  }

        .title {
    margin: 0;
    line - height: 1.15;
    font - size: 4rem;
  }

        .title,
        .description {
    text - align: center;
  }

  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100; /* Behind the navbar */
    padding: 0;
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  }
  
  .sidebar-sticky {
    position: -webkit-sticky;
    position: relative;
    top: 48px; /* Height of navbar */
    height: calc(100vh - 48px);
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  }

  @media (max-width: 767.98px) { 
    .sidebar {
      position: relative;
    }
    
    .sidebar-sticky {
      top: 0px;
      height: 100%;
    }

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
    font - family: -apple - system, BlinkMacSystemFont, Segoe UI, Roboto,
      Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
        sans - serif;
  }

        * {
    box- sizing: border - box;
}
`}</style>
    </div>
  );
}
