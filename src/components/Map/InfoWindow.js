import React from "react";
import styled from 'styled-components';

//Marker info window component to show bike/dock info
const InfoWindow = (props) => {

    const {stationInfo, stationStatusInfo} = props;

    return (
        <Wrapper>
            <h3>{stationInfo.name}</h3>
            <p>{stationInfo.address}</p>
            <BikeInfo>
                <span><Icon src={'/icons/bike.svg'} alt="Bikes"/><p>({stationStatusInfo.num_bikes_available})</p></span>
                <span>
                    <Icon src={'/icons/bike_dock.svg'}
                          alt="Docks"/><p>({stationStatusInfo.num_docks_available})</p>
                </span>
            </BikeInfo>
        </Wrapper>
    )

}

// styled components
const Wrapper = styled.div`
    width: 200px;
    height: 130px;
    background: #ffffff;
    display: flex;
	flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    color: #000000;
    z-index: 1;
    bottom: 2px;
    padding: 1px;
    position: absolute;
	
	 h3 {
		margin: 0px;
	 }
	 p {
	    color: darkgreen;
	    margin: 2px;
	 }
`;

const BikeInfo = styled.div`
		padding-top : 10px;
		display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
		    p {
	            font-size: 1rem;
	            color:crimson;
	        }
`;

const Icon = styled.img`
    width: 32px;
	height: 32px;
`;
export default InfoWindow;