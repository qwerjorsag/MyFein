import React from "react";
import {Card, CardContent, Typography} from "@mui/material";
import HoverRating from "../reviewStars/HoverRating";

interface ReviewProps {
    name: string;
    rating: number;
    reviewText: string;
    date: string;
}

const ReviewCard: React.FC<ReviewProps> = ({name, rating, reviewText, date}) => {
    return (
        <Card sx={{maxWidth: 300, margin: "0 auto"}}>
            <CardContent>
                <Typography variant="h6">{name}</Typography>
                {/*<Typography variant="body2" color="textSecondary">*/}
                {/*    Rating: {rating}/5*/}
                {/*</Typography>*/}
                <HoverRating setRating={null} rating={rating}/>
                <Typography variant="body1" sx={{marginTop: 1}}>
                    {reviewText}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    {new Date(date).toLocaleDateString()}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ReviewCard;
