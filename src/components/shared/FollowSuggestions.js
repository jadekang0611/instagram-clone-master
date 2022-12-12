import { Typography } from "@material-ui/core";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LoadingLargeIcon } from "../../icons";
import { useFollowSuggestionsStyles } from "../../styles";
import { getDefaultUser } from "../../data";

function FollowSuggestions() {
  const classes = useFollowSuggestionsStyles();
  let loading = true;
  return (
    <div className={classes.container}>
      <Typography
        color="textSecondary"
        variant="subtitle2"
        className={classes.typography}
      >
        Suggestions For You
      </Typography>
      {loading ? (
        <LoadingLargeIcon />
      ) : (
        <Slider
          className={classes.slide}
          dots={false}
          infinite
          speed={1000}
          touchThreshold={1000}
          variableWidth
          swipeToSlide
          arrows
          slidesToScroll={3}
          easing="ease-in-out"
        >
          {Array.from({ length: 10 }, () => getDefaultUser()).map((user) => (
            <FollowSuggestionsItem item={user} />
          ))}
        </Slider>
      )}
    </div>
  );
}

function FollowSuggestionsItem() {
  return <div></div>;
}

export default FollowSuggestions;
