import React from 'react';

/**
 * Sort Component
 *
 * @summary
 * Provides dropdown to sort the list
 *
 * @param props
 *
 * @returns {React.FC}
 */
const SortComponent = (props) => {
  const { sortList, currentSortValue } = props;

  return (
    <>
      <select
        className="custom-select"
        value={currentSortValue}
        onChange={sortList}
      >
        <option value="">Sort By Id</option>
        <option value="Ascending">Ascending</option>
        <option value="Descending">Descending</option>
      </select>
      <style jsx>{``}</style>
    </>
  );
};

export default SortComponent;
