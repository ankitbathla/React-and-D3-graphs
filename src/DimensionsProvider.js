/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";

const DimensionsContext = React.createContext(null);

const DimensionsProvider = (props) => {
    const domNode = useRef(null);
    const [dimensions, setDimensions] = useState({});
    const [timeoutID, newTimeoutID] = useState(null);

    useEffect(() => {
        setDimensions(domNode.current.getBoundingClientRect());
    }, []);

    useEffect(() => {
        window.addEventListener("resize", getNodeDimensions);
        return () => {
            window.removeEventListener("resize", getNodeDimensions);
        };
    }, []);

    const getNodeDimensions = () => {
        clearTimeout(timeoutID);
        newTimeoutID(
            setTimeout(() => {
                setDimensions(domNode.current.getBoundingClientRect());
            }, 500)
        );
    };

    return (
        <div ref={domNode} style={{ height: "100%" }}>
            <DimensionsContext.Provider value={{ dimensions }}>
                {props.children}
            </DimensionsContext.Provider>
        </div>
    );
};

const DimensionsConsumer = DimensionsContext.Consumer;
export { DimensionsProvider, DimensionsConsumer, DimensionsContext };
