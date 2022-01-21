import React, { useContext, useState } from 'react';
import { propertiesPlaceHolder } from '../data';

const PropertiesContext = React.createContext();

const PropContext = ({children}) => {
    const [allProps, setAllProps] = useState([...propertiesPlaceHolder]);

    return (
        <PropertiesContext.Provider value={{allProps, setAllProps}}>
            {children}
        </PropertiesContext.Provider>
    )
}

const usePropertiesContext = () => useContext(PropertiesContext);

export {PropContext, usePropertiesContext};