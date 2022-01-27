import arrow from "../../../public/images/arrow.png";
import Image from "next/image";
import {
	TimePickerWrapper,
	TimePicker,
	Time,
	GoUp,
	GoDown,
} from "../ShowingSect/style";

const Modal = () => {
	<TimePickerWrapper>
		<Label>Pick A Time</Label>
		<TimePicker>
			<GoUp>
				<div>
					<Image src={arrow} alt="" />
				</div>
			</GoUp>
			{availableTime.map((el, i) => {
				const str = el.t;
				const result = str.toLocaleString("en-US", {
					hour: "numeric",
					minute: "numeric",
					hour12: true,
				});

				const str2 = el.old;
				const result2 = str2.toLocaleString("en-US", {
					hour: "numeric",
					minute: "numeric",
					hour12: true,
				});
				return (
					<Time key={i} onClick={(e) => thisTime(e)}>
						{`${result2} - ${result}`}
					</Time>
				);
			})}
			<GoDown>
				<div>
					<Image src={arrow} alt="" />
				</div>
			</GoDown>
		</TimePicker>
	</TimePickerWrapper>;
};

export default Modal;
