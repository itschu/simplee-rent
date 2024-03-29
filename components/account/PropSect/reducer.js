const reducer = (state, action) => {
	switch (action.type) {
		case "changename":
			return { ...state, name: action.payload };
		case "changestreet":
			return { ...state, street: action.payload };
		case "changeunits":
			return { ...state, units: action.payload };
		case "changecity":
			return { ...state, city: action.payload };
		case "changecountry":
			return { ...state, country: action.payload };
		case "changeimg":
			return { ...state, fileName: action.payload };
		case "changesrc":
			return { ...state, src: action.payload };
		case "changetitle":
			return { ...state, title: action.payload };
		case "changeid":
			return { ...state, id: action.payload };
		case "changeunique":
			return { ...state, unique: action.payload };
		case "changeowner":
			return { ...state, owner: action.payload };
		default:
			throw new Error();
	}
};

export const initialState = {
	id: 0,
	title: "",
	name: "",
	street: "",
	units: 1,
	city: "",
	country: "",
	img: "",
	unique: "",
};

export default reducer;
