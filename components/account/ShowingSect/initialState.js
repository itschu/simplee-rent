import { formatTime } from "../TimePicker";

export const template = [
	{
		id: 0,
		property: "default",
		duration: 15,
		date: null,
		time: [],
		display_time: null,
	},
];

let d = new Date();
export const selectTimeTemp = {
	from: "12:00AM",
	to: "11:59PM",
};

export const old_selectTimeTemp = {
	from: {
		firstHr: formatTime(d.getHours()),
		firstMin: formatTime(d.getMinutes()),
	},
	to: {
		firstHr: formatTime(d.getHours() + 2),
		firstMin: formatTime(d.getMinutes()),
	},
};
