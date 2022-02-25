import { useEffect } from "react";
import moment from "moment";
import { Select } from "./style";

const isEarlierThanEndLimit = (timeValue, endLimit, lastValue) => {
	const timeValueIsEarlier =
		moment(timeValue, "h:mmA").diff(moment(endLimit, "h:mmA")) < 0;
	const timeValueIsLaterThanLastValue =
		lastValue === undefined
			? true
			: moment(lastValue, "h:mmA").diff(moment(timeValue, "h:mmA")) < 0;
	return timeValueIsEarlier && timeValueIsLaterThanLastValue;
};

const NewTimePicker = ({
	defaultValue,
	name,
	begin,
	end,
	stp,
	id,
	fn,
	types,
	stateFn,
	state,
}) => {
	const newFn = (s, t, v) => {
		if (t == "from") {
			// console.log("yes");
			if (moment(s.to, ["h:mm A"]).format("HH:mm") == "23:59") {
				stateFn({ ...s, [t]: v, to: v });
			} else {
				stateFn({ ...s, [t]: v });
			}
		} else {
			stateFn({ ...s, [t]: v });
		}
	};
	useEffect(() => {
		fn(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	let timeValue = begin || "12:00AM";
	let lastValue;
	const endLimit = end || "11:59PM";
	const step = stp || 15;
	const options = [];
	// console.log(state);
	options.push(timeValue);
	while (isEarlierThanEndLimit(timeValue, endLimit, lastValue)) {
		lastValue = timeValue;
		timeValue = moment(timeValue, "h:mmA")
			.add(step, "minutes")
			.format("h:mmA");
		typeof timeValue !== "object" && options.push(timeValue);
	}

	if (types == "from") {
		// console.log(state[types], state.from, id);
	}

	return (
		<Select
			defaultValue={defaultValue}
			onChange={(e) => {
				newFn(state, types, e.target.value);
			}}
			name={name}
			value={state[types]}
		>
			{options.map((el, i) => (
				<option key={i} value={el}>
					{el}
				</option>
			))}
		</Select>
	);
};

export default NewTimePicker;
