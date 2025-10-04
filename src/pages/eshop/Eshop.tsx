import React, {useState, useEffect, useCallback} from 'react';
import CoffeeProductCard from '../../components/coffeeproduct/CoffeeProductCard'; // Adjust the import path as necessary
import coffeeCatalog from '../../data/coffeecatalog.json'; // Adjust the import path as necessary
import Filter from '../../components/filters/FilterRoast'; // Import the Filter component
import AcidityFilter from '../../components/filters/FilterAcidity'; // Import the Acidity Filter component
import './Eshop.css';
import { Helmet } from 'react-helmet-async';


// import "../branch/BranchPage.css"

interface CoffeeProduct {
    id: number;
    name: string;
    flavor: string;
    acidity: string;
    roastLevel: string;
    weights: { weight: number; price: number }[];
    imageUrl: string;
}

const Eshop: React.FC = () => {


    const [cart, setCart] = useState<CoffeeProduct[]>([]);
    const [visibleProducts, setVisibleProducts] = useState<CoffeeProduct[]>([]); // Store visible products
    const [selectedRoastLevels, setSelectedRoastLevels] = useState<string[]>([]); // Track selected roast filters
    const [acidityFilter, setAcidityFilter] = useState<string>('All'); // Track selected acidity filter

    // Get unique roast levels and acidity levels from coffee catalog
    const roastLevels = Array.from(new Set(coffeeCatalog.map((product) => product.roastLevel)));
    const acidityLevels = Array.from(new Set(coffeeCatalog.map((product) => product.acidity)));

    // Load the initial 9 products
    useEffect(() => {
        setVisibleProducts(coffeeCatalog.slice(0, 12));
    }, []);

    // Function to load more products
    const loadMoreProducts = useCallback(() => {
        if (visibleProducts.length < coffeeCatalog.length) {
            setVisibleProducts((prevVisibleProducts) => [
                ...prevVisibleProducts,
                ...coffeeCatalog.slice(prevVisibleProducts.length, prevVisibleProducts.length + 9)
            ]);
        }
    }, [visibleProducts]);

    // Infinite scroll detection
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 1) {
                loadMoreProducts();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loadMoreProducts]);

    const addToCart = (product: CoffeeProduct) => {
        setCart((prevCart) => [...prevCart, product]);
        alert(`${product.name} added to cart!`);
    };

    // Filter the coffee products based on roast levels and acidity
    const filteredProducts = visibleProducts.filter((product) => {
        const roastCondition = selectedRoastLevels.length === 0 || selectedRoastLevels.includes(product.roastLevel);
        const acidityCondition = acidityFilter === 'All' || product.acidity === acidityFilter;
        return roastCondition && acidityCondition;
    });

    return (

        <div className="eshop-container">

            <Helmet>
                <title>MyFein | E-shop</title>
                <meta name="description" content="Explore MyFein's online shop for the best coffee." />
                <meta name="keywords" content="coffee, e-shop, MyFein, online coffee shop" />
            </Helmet>

            <header className="eshop-header">
                <h1>Welcome to Our Coffee Shop!</h1>
                <h2>Browse Our Coffee Catalog</h2>
            </header>
            <main className="eshop-content">
                {/* Add the Roast Level Filter with checkboxes */}
                <div className="filter-container1">
                    <Filter
                        selectedRoastLevels={selectedRoastLevels}
                        setSelectedRoastLevels={setSelectedRoastLevels}
                        roastLevels={roastLevels}
                    />
                    {/* Add the Acidity Level Filter */}
                    <AcidityFilter filter={acidityFilter} setFilter={setAcidityFilter}
                                   acidityLevels={acidityLevels}/>
                </div>
                <div className="coffee-grid">
                    {filteredProducts.map((product) => (
                        <CoffeeProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={addToCart}
                        />
                    ))}
                </div>
            </main>
        </div>

)
    ;
};

export default Eshop;
