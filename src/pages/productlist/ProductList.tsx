import React, {useState, useEffect, useCallback} from 'react';
import { CoffeeProduct } from '../../types/Coffee';
import { useCart } from '../../context/Cart';
import coffeeCatalog from '../../data/coffeecatalog.json';
import CoffeeCard from "../../components/coffeecarditem/CoffeeCardItem";
import "../../components/coffeeproduct/CoffeeCatalog.css";
import AcidityFilter from "../../components/filters/FilterAcidity";
import Filter from "../../components/filters/FilterRoast";
import "./ProductList.css"

const ProductList: React.FC = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<CoffeeProduct[]>([]);
    const [visibleProducts, setVisibleProducts] = useState<CoffeeProduct[]>([]); // Store visible products
    const [selectedRoastLevels, setSelectedRoastLevels] = useState<string[]>([]); // Track selected roast filters
    const [acidityFilter, setAcidityFilter] = useState<string>('All'); // Track selected acidity filter
    const [selectedWeights, setSelectedWeights] = useState<{ [key: number]: number }>({});

    // Get unique roast levels and acidity levels from coffee catalog
    const roastLevels = Array.from(new Set(coffeeCatalog.map((product) => product.roastLevel)));
    const acidityLevels = Array.from(new Set(coffeeCatalog.map((product) => product.acidity)));

    // Load the initial 9 products
    useEffect(() => {
        setVisibleProducts(coffeeCatalog.slice(0, 9));
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

    useEffect(() => {
        // Load products from JSON
        setProducts(coffeeCatalog);

        // Initialize weight selections
        const initialWeightSelections = coffeeCatalog.reduce((acc, product) => {
            acc[product.id] = 0; // Default to first weight option
            return acc;
        }, {} as { [key: number]: number });

        setSelectedWeights(initialWeightSelections);
    }, []);

    const handleWeightSelection = (productId: number, weightIndex: number) => {
        setSelectedWeights(prev => ({
            ...prev,
            [productId]: weightIndex
        }));
    };

    const handleAddToCart = (product: CoffeeProduct) => {
        const weightIndex = selectedWeights[product.id] ?? 0;
        const selectedWeight = product.weights[weightIndex];
        addToCart(product, selectedWeight);
    };

    const filteredProducts = visibleProducts.filter((product) => {
        const roastCondition = selectedRoastLevels.length === 0 || selectedRoastLevels.includes(product.roastLevel);
        const acidityCondition = acidityFilter === 'All' || product.acidity === acidityFilter;
        return roastCondition && acidityCondition;
    });

    return (
        
        
        <div>
            <div className="filter-container">

                <Filter
                    selectedRoastLevels={selectedRoastLevels}
                    setSelectedRoastLevels={setSelectedRoastLevels}
                    roastLevels={roastLevels}
                />

                {/* Add the Acidity Level Filter */}
                <AcidityFilter filter={acidityFilter} setFilter={setAcidityFilter} acidityLevels={acidityLevels}/>

            </div>

            <div className="coffee-catalog">
            {filteredProducts.map(product => (
                <CoffeeCard
                    key={product.id}
                    product={product}
                    selectedWeightIndex={selectedWeights[product.id]}
                    onWeightSelect={handleWeightSelection}
                    onAddToCart={handleAddToCart}
                />
            ))}
            </div>

        </div>
    );
};

export default ProductList;

