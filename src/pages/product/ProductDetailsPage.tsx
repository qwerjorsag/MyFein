// src/pages/ProductDetailsPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../../components/productDetails/ProductDetails'; // Import ProductDetails component
import { CoffeeProduct } from '../../types/Coffee'; // Ensure the type is imported
import coffeecatalog from '../../data/coffeecatalog.json';
import {Helmet} from "react-helmet"; // Import the JSON file directly

const ProductDetailsPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>(); // Get productId from the URL
    const [product, setProduct] = useState<CoffeeProduct | null>(null); // State to hold product data

    useEffect(() => {
        const foundProduct = coffeecatalog.find((item: CoffeeProduct) => item.id === Number(productId));

        if (foundProduct) {
            setProduct(foundProduct); // Set the product state
        } else {
            console.error('Product not found!');
        }
    }, [productId]);

    if (!product) return <div>Product not found!</div>; // Show error if product is not found

    return (
        <div className="product-details-page">

            <Helmet>
                <title>MyFein | {product.name}</title>  {/* Assuming 'product' has a 'name' property */}
                <meta name="description"
                      content="MyFein, nejlepší káva online. Šálek kávy má být jednoduchý a rychlý."/>
                <meta name="keywords"
                      content="MyFein, káva online, objednávka kávy, nejlepší káva, nákup kávového příslušenství"/>
                <meta name="author" content="MyFein"/>
                <meta name="robots" content="index, follow"/>
            </Helmet>

            {/* Pass the fetched product to the ProductDetails component */}
            <ProductDetails product={product} />
        </div>
    );
};

export default ProductDetailsPage;
