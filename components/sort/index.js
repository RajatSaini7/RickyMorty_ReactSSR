import React from 'react';

const SortComponent = (props) => {
    const { sortList } = props;
    const defaultVal = null;
    return (
        <>
            <select className="custom-select" onChange={sortList}>
                <option value="">Sort By Id</option>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
            </select>
            <style jsx>{`
        `}</style>
        </>
    )
};


export default SortComponent;