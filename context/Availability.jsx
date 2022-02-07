import React, { useContext, useState } from "react";

const Context = React.createContext();

const AvailabilityContext = ({ children }) => {
	const [availability, setAvailability] = useState([]);

	return (
		<Context.Provider value={{ availability, setAvailability }}>
			{children}
		</Context.Provider>
	);
};

const useAvailabilityContext = () => useContext(Context);

export { AvailabilityContext, useAvailabilityContext };
