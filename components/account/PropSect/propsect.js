import { H1, Wrapper } from "../DashSect/style";
import {
	AddProp,
	PropCards,
	PropCardWrapper,
	Span,
	P,
	AddItemOverlay,
} from "./style";
import addImg from "../../../public/images/add.png";
import Image from "next/image";
import { template } from "../../../data";
import { useState, useReducer } from "react";
import EditWrapper from "./EditWrapper";
import reducer, { initialState } from "./reducer";
import { News, NewsWrapper } from "../DashSect/style";
import { usePropertiesContext, useShowingsContext } from "../../../context";

const Prop = ({ page }) => {
	const [showOverlay, setShowOverlay] = useState(false);
	const { allProps, setAllProps } = usePropertiesContext();
	const { showings, setShowings } = useShowingsContext();

	const processInformation = (e) => {
		e.preventDefault();
		const newList = allProps.map((el) => {
			return propertyState.id == el.id ? { ...el, ...propertyState } : el;
		});
		setAllProps([...newList]);
		closeOverlay();
	};

	const deleteItem = (e) => {
		e.preventDefault();
		const prompt = window.confirm(
			"Are you sure you want to delete this property and all Showings connected to this property?"
		);
		if (prompt) {
			const newList = allProps.filter((el) => propertyState.id !== el.id);
			const newShowingList = showings.filter(
				(el) => propertyState.unique !== el.unique
			);
			setAllProps([...newList]);
			setShowings([...newShowingList]);
			closeOverlay();
		}
	};

	const newProp = (e) => {
		e.preventDefault();
		let rand = (Math.random() + 1).toString(36).substring(7);
		setAllProps([
			...allProps,
			{
				...propertyState,
				id: allProps.length + 1,
				title: propertyState.name,
				unique: `0x${rand}${0}`,
			},
		]);
		closeOverlay();
	};

	const toggleOverlay = (propname = null) => {
		dispatch({ type: "changetitle", payload: propname });
		setShowOverlay(!showOverlay);
	};
	const closeOverlay = () => {
		dispatch({ type: "changeimg", payload: "imageimg-icon.png" });
		setShowOverlay(!showOverlay);
	};
	const [propertyState, dispatch] = useReducer(reducer, initialState);

	const setDetails = (obj, proptitle) => {
		dispatch({ type: "changename", payload: obj.name });
		dispatch({ type: "changestreet", payload: obj.street });
		dispatch({ type: "changeunits", payload: obj.units });
		dispatch({ type: "changecity", payload: obj.city });
		dispatch({ type: "changecountry", payload: obj.country });
		dispatch({ type: "changeimg", payload: obj.fileName });
		dispatch({ type: "changeid", payload: obj.id });
		dispatch({ type: "changeunique", payload: obj.unique });
		toggleOverlay(proptitle);
	};
	const imgSrc = `/images/${propertyState.img}`;
	return (
		<Wrapper>
			<H1>My {page}. </H1>
			<AddItemOverlay show={showOverlay}>
				<form onSubmit={processInformation}>
					<EditWrapper
						propState={propertyState}
						close={closeOverlay}
						img={imgSrc}
						fn={dispatch}
						del={deleteItem}
						add={newProp}
					/>
				</form>
			</AddItemOverlay>

			<PropCardWrapper>
				{allProps.length > 0 ? (
					allProps.map((el, i) => {
						return (
							<PropCards
								key={i}
								bgImg={el.src}
								onClick={() => setDetails(el, el.title)}
							>
								<P> {el.title} </P>
								<Span> {el.units} units available </Span>
							</PropCards>
						);
					})
				) : (
					<NewsWrapper>
						{/* <H3>Upcoming Showing</H3> */}
						<News>
							<p>
								<>You haven't added any property yet!! </>
							</p>
						</News>
					</NewsWrapper>
				)}
			</PropCardWrapper>

			<AddProp
				onClick={() => setDetails({ ...template }, "Add New Property")}
			>
				<Image src={addImg} alt="add more properties" />
			</AddProp>
		</Wrapper>
	);
};

export default Prop;
