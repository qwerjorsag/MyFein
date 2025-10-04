import React from 'react';
import {Typography} from "@mui/material";
import RestaurantMenu from '../../components/restaurantmenu/restaurantmenu';
import {Helmet} from "react-helmet";

const RestaurantPage: React.FC = () => {
    return (
        <div>
            <div>

                <Helmet>
                    <title>MyFein | Menu</title>
                    <meta name="description"
                          content="MyFein, nejlepší káva online. Šálek kávy má být jednoduchý a rychlý."/>
                    <meta name="keywords"
                          content="MyFein, káva online, objednávka kávy, nejlepší káva, nákup kávového příslušenství"/>
                    <meta name="author" content="MyFein"/>
                    <meta name="robots" content="index, follow"/>


                </Helmet>

                {/*<h1>Menu</h1>*/}
                <Typography variant="h1">Menu</Typography>
                <RestaurantMenu />
            </div>
        </div>
    );
};

export default RestaurantPage;