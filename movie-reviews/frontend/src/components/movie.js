import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link, useParams } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import moment from 'moment';
import Button from "react-bootstrap/Button";

const Movie = (props) => {
    const { id } = useParams();

    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: [],
    });

    const getMovie = (id) => {
        MovieDataService.get(id)
            .then((response) => {
                setMovie(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteReview = (reviewId, index) => {
        MovieDataService.deleteReview(reviewId, props.user.id)
            .then(response => {
                setMovie((prevState) => {
                    prevState.reviews.splice(index, 1)
                    return ({
                        ...prevState
                    })
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        getMovie(id);
    }, [id]);

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={movie.poster + "/100px250"} fluid />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>{movie.plot}</Card.Text>
                                {props.user && (
                                    <Link to={"/movies/" + id + "/review"}>
                                        Add Review
                                    </Link>
                                )}
                            </Card.Body>
                        </Card>
                        <br />
                        <h2>Reviews</h2>
                        <br></br>
                        {movie.reviews.map((review, index) => {
                            return (
                                <Card key={index} className="mb-3">
                                    <Card.Body>
                                        <Card.Title>
                                            <h5>
                                                {review.name + " reviewed on "} {" "}
                                                {moment(review.date).format("Do MMMM YYYY")}
                                            </h5>
                                        </Card.Title>
                                        <Card.Text>{review.review}</Card.Text>

                                        {props.user && props.user.id === review.user_id && (
                                            <Row>
                                                <Col>
                                                    <Link
                                                        to={{
                                                            pathname:
                                                                "/movies/" +
                                                                props.match.params.id +
                                                                "/review",
                                                            state: { currentReview: review },
                                                        }}
                                                    >
                                                        Edit
                                                    </Link>
                                                </Col>
                                                <Col>
                                                    <Button variant="link" onClick={() => deleteReview(review._id, index)}>
                                                        Delete
                                                    </Button>
                                                </Col>
                                            </Row>
                                        )}
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Movie;

// Summary
// This React component, `Movie`, is responsible for displaying detailed information about a single movie along with its reviews. Here’s a clear breakdown of what it does:

// **Core functionality:**

// * It retrieves a movie ID from the URL using `useParams`.
// * It maintains local state (`movie`) using `useState`, storing details like title, rating, and reviews.
// * On component mount (and whenever the ID changes), it fetches movie data from `MovieDataService.get(id)` via `useEffect`.
// * The fetched data is saved into state and used to render the UI.

// **UI structure:**

// * Uses React Bootstrap components (`Container`, `Row`, `Col`, `Card`, `Image`, `Button`) to layout the page.
// * Displays:

//   * Movie poster
//   * Title and plot
//   * A list of reviews

// **User interactions:**

// * If a user is logged in (`props.user` exists):

//   * They can navigate to an “Add Review” page.
// * For each review:

//   * Displays reviewer name, formatted date (via `moment`), and review text.
//   * If the logged-in user is the author of a review:

//     * Shows options to **edit** (via a `Link` with preloaded state) or **delete** (button, though no handler is implemented).

// **Key points:**

// * Data fetching is asynchronous and handled with promises.
// * Conditional rendering is used to control access to actions (add/edit/delete reviews).
// * Dates are formatted into a readable form using `moment`.

// **In short:**
// This component fetches and displays a movie’s details and its reviews, while allowing authenticated users to add, edit, or delete their own reviews.
