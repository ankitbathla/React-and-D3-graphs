import React from "react";
import "./App.css";
import { DimensionsProvider } from "./DimensionsProvider";
import ReactNode from "./ReactNode";

function App() {
    const data = [
        {
            year: 2021,
            value: 60,
        },
        {
            year: 2020,
            value: 20,
        },
        {
            year: 2019,
            value: 30,
        },
        {
            year: 2018,
            value: 40,
        },
        {
            year: 2017,
            value: 50,
        },
        {
            year: 2016,
            value: 10,
        },
        {
            year: 2015,
            value: 40,
        },
        {
            year: 2014,
            value: 60,
        },
    ];
    return (
        <div className="myLayout">
            <div className="coolThing">
                <DimensionsProvider>
                    <ReactNode data={data} />
                </DimensionsProvider>
            </div>
        </div>
    );
}

export default App;
