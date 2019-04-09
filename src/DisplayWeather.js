import React from 'react';
import { connect } from 'react-redux';
import { getCoords, fetchWeather } from './redux/actions';
import WeatherIcon from 'react-icons-weather';

class DisplayWeather extends React.Component {

    componentDidMount() {
        this.getLocation()
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition)
        }
        else {
            alert("Geolocation is not supported ")
        }
    }

    showPosition = (position) => {
        this.props.getCoords(position)
        //after getting the lat and lon, do the fetch request
        this.weatherNow()
    }

    weatherNow = () => {
        const { coordinate, fetchWeather } = this.props
        const lat = coordinate[0].lat
        const lon = coordinate[0].lon
        fetchWeather(lat, lon)
    }


    convertKelvinToCelsius = (kelvin) => {
        const celcius = Math.round(((kelvin - 273.15) * 10) / 10)
        return celcius;
    }

    weatherDisplay = () =>
        this.props.weatherData.map((data, index) => {
            const temp_avg = this.convertKelvinToCelsius(data.temp.temp)
            const temp_max = this.convertKelvinToCelsius(data.temp.temp_max)
            const temp_min = this.convertKelvinToCelsius(data.temp.temp_min)
            return (
                <div key={index} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <p>{data.city}</p>
                    <span className="temperature">{temp_avg}°</span>
                    <span className="temperature-max-min">{temp_max}°/{temp_min}°</span>
                    <span className="unit hide">c</span>
                    {data.weather.map((data, index) =>
                        < WeatherIcon name="owm" key={index} iconId={data.id.toString()} description={data.description} flip="horizontal" rotate="90" />
                    )}
                </div>
            )
        });

    render() {
        return (
            <div>
                {this.weatherDisplay()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        coordinate: state.coord, // have lat & lon
        weatherData: state.weather
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCoords: (position) => { dispatch(getCoords(position)) },
        fetchWeather: (lat, lon) => { dispatch(fetchWeather(lat, lon)) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayWeather)