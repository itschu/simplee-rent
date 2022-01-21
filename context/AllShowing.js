import React, { useContext, useState } from 'react';
import { showingsTemplate } from '../data';

const ShowingsContext = React.createContext();

const AllShowingsContext = ({children}) => {
    const [showings, setShowings] = useState([...showingsTemplate]);

    return (
        <ShowingsContext.Provider value={{showings, setShowings}}>
            {children}
        </ShowingsContext.Provider>
    )
}

const useShowingsContext = () => useContext(ShowingsContext);

export {AllShowingsContext, useShowingsContext};