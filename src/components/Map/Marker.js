import React, {useState} from "react";
import styled from 'styled-components'
import InfoWindow from "./InfoWindow";

//Google marker component to show bike station info
const Marker = (props) => {

    const {stationInfo, stationStatusInfo} = props;
    const [showInfo, setShowInfo] = useState(false)

    /*
        If 0 bikes marker color will be red.
        If 0 bike parking docks marker color will be blue.
        If both bikes and docks marker color will be green.
    */
    const setMarkerBackground = () => {
        if (stationStatusInfo.num_bikes_available === 0) {
            return "red";
        } else if (stationStatusInfo.num_docks_available === 0) {
            return "blue";
        } else {
            return "green";
        }
    };

    //Toggle info-window mouse in and mouse out
    const toggleInfoWindow = () => {
        setShowInfo(!showInfo)
    }

    return (
        <MarkerWrapper
            markerBackground={setMarkerBackground}
            onMouseEnter={toggleInfoWindow}
            onMouseLeave={toggleInfoWindow}
        >
            <span className='info'>B : {stationStatusInfo.num_bikes_available}</span>
            <span className='info'>D : {stationStatusInfo.num_docks_available}</span>
            {showInfo && <InfoWindow
                stationInfo={stationInfo}
                stationStatusInfo={stationStatusInfo}
            >
            </InfoWindow>}
        </MarkerWrapper>
    )

}

// styled components
const MarkerWrapper = styled.div`
    width: 35px;
    height: 35px;
    background: ${props => props.markerBackground};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
	flex-direction: column;
    font-size: 0.6rem;
    color: white;
	text-align: left;
	
	.info {
		width: 100%;
		padding-left: 10px;	
	}
`;

export default Marker;