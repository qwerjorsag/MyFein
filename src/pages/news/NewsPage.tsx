import React, { useState } from 'react';
import NewsItem from '../../components/newsitem/NewsItem'; // Adjust path as necessary
import newsData from '../../data/news.json'; // JSON file with news data
import './NewsPage.css';
import {Helmet} from "react-helmet";

const NewsPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // State for items per page
    const [selectedField, setSelectedField] = useState<string>(''); // State for field filter

    // Filter the news data based on the selected field
    const filteredNews = selectedField
        ? newsData.filter((news) => news.field === selectedField)
        : newsData;

    // Calculate total number of pages for filtered data
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

    // Get the current page's news items
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

    // Handle page change
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Handle items per page change
    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newItemsPerPage = parseInt(event.target.value, 10);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to the first page
    };

    // Handle filter change
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedField(event.target.value);
        setCurrentPage(1); // Reset to the first page when filter changes
    };

    // Determine the range of pages to display (maximum 7 active pages)
    const maxVisiblePages = 7;
    let pageNumbers: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
        pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // Ensure the first and last page are always visible
        pageNumbers = [1, ...(Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index)), totalPages];

        // Remove duplicates caused by the inclusion of first and last page
        pageNumbers = Array.from(new Set(pageNumbers));

        // Add "..." for gaps
        if (pageNumbers[1] > 2) {
            pageNumbers.splice(1, 0, '...');
        }
        if (pageNumbers[pageNumbers.length - 2] < totalPages - 1) {
            pageNumbers.splice(pageNumbers.length - 1, 0, '...');
        }
    }

    return (
        <div className="news-page">
            <Helmet>
                <title>MyFein | News!</title>  {/* Assuming 'product' has a 'name' property */}
                <meta name="description"
                      content="MyFein, nejlepší káva online. Šálek kávy má být jednoduchý a rychlý."/>
                <meta name="keywords"
                      content="MyFein, káva online, objednávka kávy, nejlepší káva, nákup kávového příslušenství"/>
                <meta name="author" content="MyFein"/>
                <meta name="robots" content="index, follow"/>
            </Helmet>

            <h1>Žhave novinky!</h1>

            {/* Filter by field */}
            <div className="filter-container">
                <label htmlFor="field-filter">Téma:</label>
                <select
                    id="field-filter"
                    value={selectedField}
                    onChange={handleFilterChange}
                >
                    <option value="">All</option>
                    <option value="coffee">Káva</option>
                    <option value="politics">Politika</option>
                    <option value="sports">Sport</option>
                    <option value="technology">Technologie</option>
                    {/* Add more options as needed */}
                </select>
            </div>

            <div className="news-list">
                {currentNews.map((news) => (
                    <NewsItem
                        key={news.title} // Assuming title is unique
                        title={news.title}
                        text={news.text}
                        date={news.date}
                        author={news.author}
                        state={news.state} // Pass the 'state' from JSON data
                    />
                ))}
            </div>

            <div className="pagination-container">
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-button"
                    >
                        Previous
                    </button>
                    {pageNumbers.map((pageNumber) =>
                        pageNumber === '...' ? (
                            <span key={pageNumber} className="pagination-ellipsis">...</span>
                        ) : (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(Number(pageNumber))}
                                className={`pagination-button ${currentPage === Number(pageNumber) ? 'active' : ''}`}
                            >
                                {pageNumber}
                            </button>
                        )
                    )}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination-button"
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className="items-per-page">
                <label htmlFor="items-per-page">Items per page:</label>
                <select
                    id="items-per-page"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>
        </div>
    );
};

export default NewsPage;
