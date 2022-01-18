import React, { useContext, useState } from 'react';

const Menu = React.createContext();

const MenuState = ({children}) => {
    const [State, setState] = useState(false);

    const toggleSate = () =>{
        setState(!State);
    };

    return (
        <Menu.Provider value={{State, toggleSate}}>
            {children}
        </Menu.Provider>
    )
}

const useMenuState = () => useContext(Menu);

export {MenuState, useMenuState};