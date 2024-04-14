import React from 'react';
import "./Pagination.css"

const Pagination = ({currentPage, totalPages, onPageChange}) => {
    // Generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {/* Previous Page Button */}
                <li className={currentPage === 1 ? 'disabled' : ''}>
                    <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                </li>

                {/* Page Numbers */}
                {pageNumbers.map(number => (
                    <li key={number} className={currentPage === number ? 'active' : ''}>
                        <button onClick={() => onPageChange(number)}>{number}</button>
                    </li>
                ))}

                {/* Next Page Button */}
                <li className={currentPage === totalPages ? 'disabled' : ''}>
                    <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
