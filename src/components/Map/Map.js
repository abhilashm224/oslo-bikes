import React, {useContext, useEffect} from "react";
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import useCurrentTimeInSeconds from "../../hooks/useCurrentTimeInSeconds";
import {ReducerContext} from "../../Context";
import styled from 'styled-components'
import Marker from "./Marker";
import {defaultMapCenter, defaultMapZoom, mapApiKey} from "../../Utils";

// map component for loading google map
const Map = () => {

    const {getStationInfo, getStationStatusInfo, state} = useContext(ReducerContext)
    const {seconds} = useCurrentTimeInSeconds();

// this promise returns station info status from station status api
    const stationStatusInfo = state.stationStatusInfo.cata({
        NotAsked: () => [],
        Loading: () => [],
        Failure: err => [],
        Success: ({data}) => data.stations
    });

// Fetch station information  api
    useEffect(() => {
        getStationInfo();
    }, [])
// Fetch stations status at every 10 seconds
    useEffect(() => {
        getStationStatusInfo();
    }, [seconds])

    return (
        state.stationInfo.cata({
            NotAsked: () => '',
            Loading: () => 'Loading....',
            Failure: err => <div>Failed to fetch bike station info ({err})</div>,
            Success: ({data}) => {

                return (
                    (data.stations.length > 0 && stationStatusInfo.length > 0) &&
                    <MapWrapper>
                        <GoogleMapReact
                            bootstrapURLKeys={{key: mapApiKey}}
                            defaultCenter={defaultMapCenter}
                            defaultZoom={defaultMapZoom}
                        >
                            {
                                data.stations.map(item => {

                                    const currentStationInfo = stationStatusInfo.find(
                                        status => item.station_id === status.station_id
                                    );

                                    return (
                                        <Marker
                                            key={item.station_id}
                                            lat={item.lat}
                                            lng={item.lon}
                                            stationInfo={item}
                                            stationStatusInfo={currentStationInfo}
                                        />
                                    )
                                })
                            }
                        </GoogleMapReact>
                    </MapWrapper>
                )
            }
        })
    )
}

// styled components
const MapWrapper = styled.div`
  height: 80vh;
  width: 100%;
`;

//set required prop types for marker component
Marker.propTypes = {
    position: PropTypes.shape({
        lat: PropTypes.number,
        lon: PropTypes.number
    }),
    stationStatusInfo: PropTypes.shape({
        station_id: PropTypes.string,
        num_bikes_available: PropTypes.number,
        num_docks_available: PropTypes.number
    }).isRequired,

    stationInfo: PropTypes.shape({
        station_id: PropTypes.string,
        name: PropTypes.string,
        address: PropTypes.string,
        lat: PropTypes.number,
        lon: PropTypes.number,
        capacity: PropTypes.number
    }).isRequired
};

export default Map;