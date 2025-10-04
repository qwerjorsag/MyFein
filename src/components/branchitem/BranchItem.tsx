import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './BranchItem.css';

interface BranchItemProps {
    shopname: string;
    size: string;
    address: string;
    foto: string; // Only store the image name
    city: string;
}

const BranchItem: React.FC<BranchItemProps> = ({ shopname, size, address, foto, city }) => {
    const branchItemRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Observer to detect when the element is in the viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                root: null, // Uses the viewport as the container
                threshold: 0.2, // Trigger when 20% of the element is visible
            }
        );

        if (branchItemRef.current) {
            observer.observe(branchItemRef.current);
        }

        return () => {
            if (branchItemRef.current) {
                observer.unobserve(branchItemRef.current);
            }
        };
    }, []);

    return (
        <Link to={`/shops/${shopname}`} className="branch-item-link"> {/* Add Link around the branch */}
            <div
                ref={branchItemRef}
                className={`branch-item ${isVisible ? 'visible' : ''}`}
            >
                <div className="branch-item-info">
                    <h2 className="branch-title">{shopname}</h2>
                    <p className="branch-text">Address: {address}, {city}</p>
                    <p className="branch-text">Size: {size}</p>
                </div>
                <img
                    src={`/shops/${foto}`}
                    alt={`Image of ${shopname}`}
                    className="branch-foto"
                />
            </div>
        </Link>
    );
};

export default BranchItem;
