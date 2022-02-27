import moment from "moment";
import randomstring from "randomstring";

export const project = {
	title: "Simplee Rent",
	descContent: "seo description content",
};

export const navItems = [
	{ title: "Dashboard", alias: "dashboard", icon: "/images/layout.png" },
	{ title: "Properties", alias: "properties", icon: "/images/house.png" },
	{
		title: "Availabilities",
		alias: "availabilities",
		icon: "/images/calendar.png",
	},
	{ title: "Showings", alias: "showings", icon: "/images/display-frame.png" },
];

export const statistics = [
	{
		title: "All Properties",
		image: "/images/prop.png",
		tempStat: "5",
		width: 126,
		height: 126,
	},
	{
		title: "Availability",
		image: "/images/cal.png",
		tempStat: "4",
		width: 89,
		height: 123,
	},
	{
		title: "Showings",
		image: "/images/show.png",
		tempStat: "2",
		width: 126,
		height: 126,
	},
];

export const propertiesPlaceHolder = [
	{
		id: 1,
		title: "Property One",
		units: 1,
		src: "/images/home1.jpg",
		fileName: "home1.jpg",
		name: "prop1",
		street: "line2",
		city: "abj",
		country: "9ja",
		unique: "0xo0G68n",
	},
	{
		id: 2,
		title: "Property Two",
		units: 4,
		src: "/images/home2.jpg",
		fileName: "home2.jpg",
		name: "prop2",
		street: "line3",
		city: "lag",
		country: "UK",
		unique: "0oKi0G68",
	},
	{
		id: 3,
		title: "Property Three",
		units: 5,
		src: "/images/home3.jpg",
		fileName: "home3.jpg",
		name: "prop3",
		street: "line4",
		city: "ph",
		country: "ghana",
		unique: "0o0G68",
	},
];

export const template = {
	id: 0,
	title: "",
	units: 1,
	src: "",
	fileName: "",
	name: "",
	street: "",
	city: "",
	country: "",
};

export const durationTemp = [
	{ title: "15 mins", value: 15, index: 0 },
	{ title: "30 mins", value: 30, index: 1 },
	{ title: "1 hr", value: 60, index: 2 },
	{ title: "2 hrs", value: 120, index: 3 },
];

export const showingsTemplate = [
	/**
	{
		id: 1,
		property: "Full name of property",
		date: "2022-02-04",
		link: "http://google.com",
		unique: "0o0G68",
		duration: [15, 60, 120],
	},
	{
		id: 2,
		property: "Full name of property",
		date: "2022-02-04",
		link: "http://google.com",
		unique: "0o0G68",
		duration: [15, 120],
	},
	{
		id: 3,
		property: "Full name of property",
		date: "2022-02-04",
		link: "http://google.com",
		unique: "0o0G68",
		duration: [15, 60],
	},
	{
		id: 4,
		property: "Full name of property",
		date: "2022-02-04",
		link: "http://google.com",
		unique: "0oKi0G68",
		duration: [120],
	},
	*/
];
const month = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const formatDate = (td, getFulldate = false) => {
	let today, dd, mm, yyyy, seperator;
	if (getFulldate) {
		today = new Date(td);
		dd = String(today.getDate()).padStart(2, "0");
		mm = month[today.getMonth()];
		yyyy = today.getFullYear();
		seperator = " - ";
	} else {
		today = new Date(td);
		dd = String(today.getDate()).padStart(2, "0");
		mm = String(today.getMonth() + 1).padStart(2, "0");
		yyyy = today.getFullYear();
		seperator = "-";
	}

	today = `${yyyy}${seperator}${mm}${seperator}${dd}`;
	return today;
};

export const convertDate = (inputFormat) => {
	function pad(s) {
		return s < 10 ? "0" + s : s;
	}
	let d = new Date(inputFormat);
	return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
};

export const get12hrs = (dt) => moment(dt, ["h:mm A"]).format("HH:mm");

export const mergeDate = (
	arrOne,
	arrTwo = null,
	arrThree = null,
	onlyEnd = false
) => {
	let sec, secTo, third, thirdTo;
	const set_value = [];
	let first = get12hrs(arrOne?.from);
	let firstTo = get12hrs(arrOne?.to);
	if (arrTwo) {
		sec = get12hrs(arrTwo?.from);
		secTo = get12hrs(arrTwo?.to);
	}
	if (arrThree) {
		third = get12hrs(arrThree?.from);
		thirdTo = get12hrs(arrThree?.to);
	}

	if (!onlyEnd) {
		new Set([first, firstTo, sec, secTo, third, thirdTo]).forEach(
			(value) => {
				value !== undefined && set_value.push(value);
			}
		);
	} else {
		new Set([firstTo, secTo, thirdTo]).forEach((value) => {
			value !== undefined && set_value.push(value);
		});
	}

	return set_value.sort();
};

export const dateInPast = function (firstDate, secondDate) {
	if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
		return true;
	}
	return false;
};

export const randomId = (length) => {
	if (length > 2 || length < 0 || length == undefined) length = 0;
	const rand = (Math.random() + 1).toString(36).substring(length + 1);
	return `${rand}${randomstring.generate(rand)}`;
};

export const parseTime = (s) => {
	return Math.floor(parseInt(s) / 60) + "." + (parseInt(s) % 60);
};

export const converToMinutes = (s) => {
	var c = s.split(":");
	return parseInt(c[0]) * 60 + parseInt(c[1]);
};
