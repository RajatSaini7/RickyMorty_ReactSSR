import React from 'react';
import Moment from 'moment';

/**
 * Card Component
 *
 * @summary
 * Displays a card/list for the characters
 *
 * @param props
 *
 * @returns {React.FC}
 */
const CardComponent = (props) => {
  const { character } = props;

  /**
   * @function dateTimeDifference
   *
   * @summary
   * Extracts the difference based on the timestamp provided
   *
   * @param {string} value
   *
   * @returns {string}
   */
  function dateTimeDifference(value) {
    if (!value && typeof value === 'string') {
      return '';
    }

    const date = new Date(value);

    if (date.toString() === 'Invalid Date') {
      return '';
    }

    //Date conversion for Moment js
    const dateReceived = new Moment(date);
    const currentDate = new Moment(new Date());

    if (Moment.duration(currentDate.diff(dateReceived)).asYears() >= 1) {
      return `${parseInt(
        Moment.duration(currentDate.diff(dateReceived)).asYears(),
        10
      )} years ago`;
    }

    if (Moment.duration(currentDate.diff(dateReceived)).asMonths() >= 1) {
      return `${parseInt(
        Moment.duration(currentDate.diff(dateReceived)).asMonths(),
        10
      )} months ago`;
    }

    if (Moment.duration(currentDate.diff(dateReceived)).asDays() >= 1) {
      return `${parseInt(
        Moment.duration(currentDate.diff(dateReceived)).asDays(),
        10
      )} months ago`;
    }

    if (Moment.duration(currentDate.diff(dateReceived)).asHours() >= 1) {
      return `${parseInt(
        Moment.duration(currentDate.diff(dateReceived)).asHours(),
        10
      )} hours ago`;
    }

    if (Moment.duration(currentDate.diff(dateReceived)).asMinutes() >= 1) {
      return `${parseInt(
        Moment.duration(currentDate.diff(dateReceived)).asMinutes(),
        10
      )} minutes ago`;
    }
  }
  return (
    <>
      <div className="col-6 col-md-3">
        <div className="card bg-dark text-white mb-4 box-shadow">
          <div className="img-overlay-container">
            <img
              className="card-img"
              src={character.image}
              alt="Card image cap"
            />
            <div className="card-img-overlay">
              <h5 className="card-title">{character.name && character.name}</h5>
              <span className="card-text">{`id: ${
                character.id
              } - created ${dateTimeDifference(character.created)}`}</span>
            </div>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span>STATUS</span>
              <span
                data-toggle="tooltip"
                data-placement="top"
                title={character.status && character.status}
              >
                {character.status && character.status}
              </span>
            </li>
            <li className="list-group-item">
              <span>SPECIES</span>
              <span
                data-toggle="tooltip"
                data-placement="top"
                title={character.species && character.species}
              >
                {character.species && character.species}
              </span>
            </li>
            <li className="list-group-item">
              <span>GENDER</span>
              <span
                data-toggle="tooltip"
                data-placement="top"
                title={character.gender && character.gender}
              >
                {character.gender && character.gender}
              </span>
            </li>
            <li className="list-group-item">
              <span>ORIGIN</span>
              <span
                data-toggle="tooltip"
                data-placement="top"
                title={
                  character.origin &&
                  character.origin.name &&
                  character.origin.name
                }
              >
                {character.origin &&
                  character.origin.name &&
                  character.origin.name}
              </span>
            </li>
            <li className="list-group-item">
              <span>LAST LOCATION</span>
              <span
                data-toggle="tooltip"
                data-placement="top"
                title={
                  character.location &&
                  character.location.name &&
                  character.location.name
                }
              >
                {character.location &&
                  character.location.name &&
                  character.location.name}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <style jsx>
        {`
          div.card {
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
          }
          div.card:hover {
            cursor: pointer;
            border: 2px solid #000000;
          }
          .card-img {
            border-radius: 0;
          }
          .img-overlay-container {
            position: relative;
          }
          .card-img-overlay {
            position: absolute;
            bottom: 0 !important;
            height: 4em;
            width: 100%;
            padding: 7px;
            background: rgba(0, 0, 0, 0.6);
            // top: 10.79em;
            top: unset;
          }
          .card-img-overlay > h5 {
            margin-bottom: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .card-img-overlay > span {
            font-size: 0.8em;
          }
          ul.list-group {
            background: #333333f2;
            padding: 14px 14px;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
          }
          ul.list-group > li {
            display: flex;
            justify-content: space-between;
            background: none;
            border-bottom: 1px solid #dacaca24;
            border-top: 0;
            border-left: 0;
            border-right: 0;
            padding: 0.75rem 0;
          }
          ul.list-group > li span:first-child {
            color: #dacacaad;
            font-size: 0.7em;
          }
          ul.list-group > li span:nth-child(2) {
            color: #b97623eb;
            font-size: 0.7em;
            white-space: nowrap;
            // word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-left: 6em;
          }

          @media (max-width: 767.98px) {
            ul.list-group > li span:nth-child(2) {
              padding-left: 1em;
            }

            .card-img-overlay {
              height: 3em;
              padding: 1px;
              //   top: 6.79em;
            }

            .card-img-overlay > h5 {
              font-size: 0.8em;
            }

            .card-img-overlay > span.card-text {
              font-size: 0.5em;
            }
          }

          @media (max-width: 991.98px) {
            ul.list-group > li span:nth-child(2) {
              padding-left: 1em;
            }

            .card-img-overlay {
              height: 3em;
              padding: 1px;
            }

            .card-img-overlay > h5 {
              font-size: 1em;
            }

            .card-img-overlay > span.card-text {
              font-size: 0.5em;
            }
          }
        `}
      </style>
    </>
  );
};

export default CardComponent;
