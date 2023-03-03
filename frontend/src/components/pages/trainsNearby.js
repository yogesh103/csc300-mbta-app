import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../atomic/loading';

class TrainStations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      stations: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.setState({ location: { latitude, longitude } });
        this.getTrainStations();
      },
      (error) => {
        this.setState({ error: error.message, loading: false });
      }
    );
  }

  getTrainStations() {
    const { latitude, longitude } = this.state.location;
    axios
      .get(
        `https://api-v3.mbta.com/stops?filter[latitude]=${latitude}&filter[longitude]=${longitude}&filter[radius]=0.5&filter[route_type]=0`
      )
      .then((response) => {
        const stations = response.data.data;
        this.setState({ stations, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  }

  render() {
    const { stations, loading, error } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        <h1>Train Stations</h1>
        <ul>
          {stations.map((station) => (
            <li key={station.id}>{station.attributes.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TrainStations;