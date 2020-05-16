import React from 'react';

const SortComponent = (props) => {
    const { handleSort } = props;

    return (
        <>
            <select className="custom-select">
                <option selected>Sort By Id</option>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
            </select>
            <style jsx>{`
        `}</style>
        </>
    )
};


export default SortComponent;