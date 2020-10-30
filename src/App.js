import React from 'react';
import {ReducerProvider} from "./Context";
import Header from './components/Header/Header';
import Map from "./components/Map/Map";
import './App.css';

//Bootstrap component
function App() {
    return (
        <div className="App">
            <ReducerProvider>
                <Header/>
                <Map/>
            </ReducerProvider>
        </div>
    );
}

export default App;
