import React, {useReducer} from "react";
import daggy from 'daggy'
import {fetchStationInfo, fetchStationStatusInfo} from './api'
import RemoteData from "./api/remoteData";

const Actions = daggy.taggedSum('Actions', {
    HttpRequest: ['field']
})

const reducer = (state, action) => action.cata({
    HttpRequest: field => ({...state, ...field})
})

//Setting initial state for the application
const initialState = {
    stationInfo: RemoteData.NotAsked,
    stationStatusInfo: RemoteData.NotAsked,
}

const ReducerContext = React.createContext(initialState)

function ReducerProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const getStationInfo = () => {
        dispatch(Actions.HttpRequest({stationInfo: RemoteData.Loading}))
        fetchStationInfo().then(res =>
            dispatch(Actions.HttpRequest({stationInfo: res})))
    }

    const getStationStatusInfo = () => {
        dispatch(Actions.HttpRequest({stationStatusInfo: RemoteData.Loading}))
        fetchStationStatusInfo().then(res => {
            return dispatch(Actions.HttpRequest({stationStatusInfo: res}))
        })
    }


    return (
        <ReducerContext.Provider value={{
            state, dispatch, getStationInfo, getStationStatusInfo
        }}
        >
            {children}
        </ReducerContext.Provider>
    )
}

export {ReducerContext, ReducerProvider, Actions}
