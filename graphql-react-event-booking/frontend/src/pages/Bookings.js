import React, { Component } from 'react';

import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import BookingList from '../components/Bookings/BookingList/BookingList';
import BookingsChart from '../components/Bookings/BookingsChart/BookingsChart';
import BookingsControls from '../components/Bookings/BookingsControls/BookingsControls';

class BookingsPage extends Component {
  state = {
    isLoading: false,
    bookings: [],
    outputType: 'list'
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            bookings {
              _id
             createdAt
             event {
               _id
               title
               date
               price
             }
            }
          }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const bookings = resData.data.bookings;
        this.setState({ bookings: bookings, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  deleteBookingHandler = bookingId => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          mutation CancelBooking($id: ID!) {
            cancelBooking(bookingId: $id) {
            _id
             title
            }
          }
        `,
      variables: {
        id: bookingId
      }
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedBookings = prevState.bookings.filter(booking => {
            return booking._id !== bookingId;
          });
          return { bookings: updatedBookings, isLoading: false };
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  changeOutputTypeHandler = outputType => {
    if (outputType === 'list') {
      this.setState({ outputType: 'list' });
    } else {
      this.setState({ outputType: 'chart' });
    }
  };

  render() {
    let content = <Spinner />;
    if (!this.state.isLoading) {
      content = (
        <React.Fragment>
          <BookingsControls
            activeOutputType={this.state.outputType}
            onChange={this.changeOutputTypeHandler}
          />
          <div>
            {this.state.outputType === 'list' ? (
              <BookingList
                bookings={this.state.bookings}
                onDelete={this.deleteBookingHandler}
              />
            ) : (
              <BookingsChart bookings={this.state.bookings} />
            )}
          </div>
        </React.Fragment>
      );
    }
    return <React.Fragment>{content}</React.Fragment>;
  }
}

export default BookingsPage;


// ### Code Summary

// This code defines a React class component called `BookingsPage` that manages and displays user bookings. It interacts with a GraphQL backend, allows users to cancel bookings, and supports switching between a list view and a chart view.

// ---

// ## Main Purpose

// The component:

// * Fetches bookings from a GraphQL API when the page loads
// * Displays a loading spinner while data is being fetched
// * Allows users to delete/cancel bookings
// * Lets users switch between:

//   * a booking list
//   * a bookings chart

// ---

// ## Key Imports

// The component imports:

// * `React` and `Component` for creating the class component
// * `Spinner` for loading indication
// * `AuthContext` for authentication token access
// * `BookingList` to display bookings in list format
// * `BookingsChart` to visualize bookings graphically
// * `BookingsControls` to switch display modes

// ---

// ## Component State

// The component maintains three pieces of state:

// ```js
// state = {
//   isLoading: false,
//   bookings: [],
//   outputType: 'list'
// };
// ```

// ### State fields

// * `isLoading`

//   * Tracks whether API requests are in progress
// * `bookings`

//   * Stores fetched booking data
// * `outputType`

//   * Determines whether bookings are shown as:

//     * `"list"`
//     * `"chart"`

// ---

// ## Authentication Context

// ```js
// static contextType = AuthContext;
// ```

// This allows the component to access the authentication token using:

// ```js
// this.context.token
// ```

// The token is included in API request headers for authorization.

// ---

// ## Lifecycle Method

// ### `componentDidMount()`

// ```js
// componentDidMount() {
//   this.fetchBookings();
// }
// ```

// When the component loads, it automatically fetches bookings from the backend.

// ---

// # Main Methods

// ## 1. `fetchBookings()`

// This method:

// * Sends a GraphQL query to fetch bookings
// * Updates state with returned booking data
// * Handles loading and errors

// ### GraphQL Query

// It requests:

// * booking ID
// * creation date
// * event details:

//   * ID
//   * title
//   * date
//   * price

// ### Workflow

// 1. Set loading state to `true`
// 2. Send POST request to:

//    ```txt
//    http://localhost:8000/graphql
//    ```
// 3. Include auth token in headers
// 4. Parse response
// 5. Store bookings in state
// 6. Stop loading spinner

// ---

// ## 2. `deleteBookingHandler(bookingId)`

// This method cancels a booking.

// ### What it does

// * Sends a GraphQL mutation
// * Removes the deleted booking from state

// ### GraphQL Mutation

// ```graphql
// mutation CancelBooking($id: ID!) {
//   cancelBooking(bookingId: $id) {
//     _id
//     title
//   }
// }
// ```

// ### Workflow

// 1. Enable loading state
// 2. Send mutation with booking ID
// 3. Filter deleted booking from state
// 4. Update UI without refetching all bookings

// ---

// ## 3. `changeOutputTypeHandler(outputType)`

// Controls switching between views.

// ### Supported views

// * `"list"`
// * `"chart"`

// Updates:

// ```js
// this.state.outputType
// ```

// ---

// # Rendering Logic

// ## Loading State

// Initially:

// ```js
// let content = <Spinner />;
// ```

// If data is still loading, the spinner is shown.

// ---

// ## Main Content

// When loading is complete:

// * `BookingsControls` is displayed
// * User can switch display modes
// * Conditional rendering determines what appears:

// ### List View

// ```js
// <BookingList
//   bookings={this.state.bookings}
//   onDelete={this.deleteBookingHandler}
// />
// ```

// Displays bookings with delete functionality.

// ---

// ### Chart View

// ```js
// <BookingsChart bookings={this.state.bookings} />
// ```

// Displays booking data visually.

// ---

// # Overall Functionality

// This component acts as a complete booking management page that:

// * retrieves authenticated booking data,
// * supports deleting bookings,
// * provides multiple visualization modes,
// * and manages loading/error states cleanly.

// It demonstrates:

// * React class components
// * Context API usage
// * GraphQL queries/mutations
// * Conditional rendering
// * State management
// * API communication with authentication
