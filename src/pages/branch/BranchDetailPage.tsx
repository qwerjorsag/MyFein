import React from "react";
import { useParams } from "react-router-dom";
import branches from "../../data/branch.json"; // Import branch data
import MapComponent from "../../components/map/Map";
import OpeningHoursTable from "../../components/openinghours/OpeningHoursTable";
import "./BranchDetail.css";
import "../../components/openinghours/Table.css"
import {Helmet} from "react-helmet";



const BranchDetail: React.FC = () => {
    const { shopname } = useParams<{ shopname: string }>();

    // Find the branch matching the shopname
    const branch = branches.find((b) => b.shopname === shopname);

    if (!branch) {
        return (
            <div className="branch-detail not-found">
                <h2 className="branch-title">Branch not found!</h2>
            </div>
        );
    }

    const location = {
        lat: parseFloat(branch.latitude), // Latitude from branch data
        lng: parseFloat(branch.longitude), // Longitude from branch data
    };

    return (
        <div className="branch-detail">

            <Helmet>
                <title>MyFein | {branch.shopname} </title>  {/* Assuming 'product' has a 'name' property */}
                <meta name="description"
                      content="MyFein, nejlepší káva online. Šálek kávy má být jednoduchý a rychlý."/>
                <meta name="keywords"
                      content="MyFein, káva online, objednávka kávy, nejlepší káva, nákup kávového příslušenství"/>
                <meta name="author" content="MyFein"/>
                <meta name="robots" content="index, follow"/>
            </Helmet>

            <div className="branch-detail__image-wrapper">
                <img
                    src={`/shops/${branch.foto}`}
                    alt={`Image of ${branch.shopname}`}
                    className="branch-detail__image"
                />
            </div>
            <h1 className="branch-details-title">{branch.shopname}</h1>
            <div className="branch-detail__info">

                {/*<p className="branch-detail__text">*/}
                {/*    <strong>Size:</strong> {branch.size}*/}
                {/*</p>*/}


                <p className="branch-detail__text">
                    {branch.description}
                </p>

                {/* Display Opening Hours */}
                <div className="branch-detail__opening-hours">
                    <h3>Otevírací doba</h3>
                </div>


            </div>
            <div className="branch-detail__opening-hours">

                <OpeningHoursTable opening_hours={branch.opening_hours}/>
            </div>

            <p className="branch-detail__text">
                <strong>Adresa:</strong> {branch.address}, {branch.city}
            </p>


            <div className="branch-detail__map">
                <MapComponent location={location} shopname={branch.shopname}/>
            </div>
        </div>
    );
};

export default BranchDetail;
