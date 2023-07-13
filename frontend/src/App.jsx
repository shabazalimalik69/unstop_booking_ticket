import  { useState } from 'react';

const App = () => {
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [message, setMessage] = useState('');

  const handleSeatBooking = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:7000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numberOfSeats }),
      });

      const data = await response.json();

      if (response.ok) {
        setBookedSeats(data.seats);
        setMessage(data.message);
      } else {
        setMessage(data.message);
        setBookedSeats([]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Seat Booking Application</h1>
      <form onSubmit={handleSeatBooking}>
        <label>
          Number of Seats:
          <input
            type="number"
            min="1"
            value={numberOfSeats}
            onChange={(event) => setNumberOfSeats(event.target.value)}
          />
        </label>
        <button type="submit">Book Seats</button>
      </form>
      {message && <p>{message}</p>}
      {bookedSeats.length > 0 && (
        <div>
          <h2>Booked Seats:</h2>
          <ul>
            {bookedSeats.map((seat) => (
              <li key={`${seat.row}-${seat.number}`}>Row {seat.row}, Seat {seat.number}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
