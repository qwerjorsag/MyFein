import React from "react";
import Slider from "react-slick";
import branches from "../../data/branch.json"; // Import your JSON file

const CustomPaging = () => {
    const settings = {
        customPaging: function (i) {
            return (
                <a>
                    <img
                        src={`/shops/${branches[i].foto}`} // Access images directly from the public folder
                        alt={branches[i].shopname}
                        style={{
                            width: 50,
                            height: 50,
                            objectFit: "cover",
                            borderRadius: "50%", // Circular dots
                            marginBottom: -40,
                        }}
                    />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 1500,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // Disable the navigation

    };

    return (
        <div
            className="slider-container"
            style={{ maxWidth: 800, margin: "auto", marginBottom: "80px" }} // Ensures the slider respects border radius
        >
            <Slider {...settings}>
                {branches.map((branch, index) => (
                    <div key={index}>
                        <div style={{ textAlign: "center", marginTop: 10 }}>
                            <h3>{branch.shopname}</h3>
                            <p>{branch.city}</p>
                        </div>
                        <img
                            src={`/shops/${branch.foto}`} // Access images directly from the public folder
                            alt={branch.shopname}
                            style={{
                                width: "100%",
                                height: "400px",
                                objectFit: "cover",
                                borderRadius: "10px", // Add border radius here
                            }}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CustomPaging;
