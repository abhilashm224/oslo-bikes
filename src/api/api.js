import axios from 'axios';
import resolve from "./resolve";

//Call station info api
const fetchStationInfo = async () =>
    await resolve(
        axios(`${process.env.REACT_APP_API_URL}/station_information.json`)
    )
//Call station status info api
const fetchStationStatusInfo = async () =>
    await resolve(
        axios(`${process.env.REACT_APP_API_URL}/station_status.json`)
    )

export {fetchStationInfo, fetchStationStatusInfo};