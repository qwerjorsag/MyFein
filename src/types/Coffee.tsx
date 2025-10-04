export interface WeightOption {
    weight: number;
    price: number;
}

export interface CoffeeProduct {
    id: number;
    name: string;
    flavor: string;
    acidity: string;
    roastLevel: string;
    weights: WeightOption[];
    imageUrl: string;
    inStock: boolean;
}



export interface Coffee {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    origin: string;
    region: string;
    producer: string;
    altitude: string;
    variety: string;
    process: string;
    roastLevel: string;
    aroma: string;
    flavor: string;
    aftertaste: string;
    acidity: string;
    body: string;
    weights: WeightOption[];
    inStock: boolean;
}