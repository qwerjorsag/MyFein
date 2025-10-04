import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

// Labels for each star value
const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

// Function to return the label text based on the rating value
function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

interface HoverRatingProps {
    rating: number | null;
    setRating: (rating: number | null) => void;
}

export default function HoverRating({ rating, setRating }: HoverRatingProps) {
    const [hover, setHover] = React.useState(-1);

    return (
        <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
            <Rating
                name="hover-feedback"
                value={rating}
                defaultValue={4}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                    setRating(newValue); // Update parent component's rating state
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover); // Set hover value to show label on hover
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {rating !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
            )}
        </Box>
    );
}
