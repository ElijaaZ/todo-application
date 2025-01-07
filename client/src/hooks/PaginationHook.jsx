import { useState } from 'react'

const UsePagination = (items, itemsPerPage = 7) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const currentItems = items.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    }


  return { currentItems, totalPages, currentPage, goToPage }
}

export default UsePagination
