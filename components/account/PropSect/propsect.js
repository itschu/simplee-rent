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
import {
	usePropertiesContext,
	useAvailabilityContext,
	useShowingsContext,
} from "../../../context";
import axios from "axios";
import { randomId } from "../../../data";
import { deleteAvailability } from "../AvailSect/AvailSect";
import { deleteShowing } from "../ShowingSect/ShowingSect";

const addProperty = async (request) => {
	try {
		const res = await fetch(`/api/properties`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request.data),
		});

		if (res.ok) {
			axios
				.post("/api/properties/upload", request.fd, {
					headers: {
						Accept: "application/json",
						"Content-Type": "multipart/form-data",
					},
				})
				.then((res) => {
					if (res.statusText == "ok") {
						return true;
					}
					return false;
				});
		}
		return true;
	} catch (error) {
		return false;
	}
};

const removeProp = async (id) => {
	try {
		const res = await fetch(`/api/properties/${id}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		if (res.ok) {
			// delete image from server
		}
		return true;
	} catch (error) {
		return false;
	}
};

const updateProperty = async (request, id) => {
	try {
		const res = await fetch(`/api/properties/${id}`, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request.data),
		});

		if (res.ok) {
			axios
				.post("/api/properties/upload", request.fd, {
					headers: {
						Accept: "application/json",
						"Content-Type": "multipart/form-data",
					},
				})
				.then((res) => {
					if (res.statusText == "ok") {
						return true;
					}
					return false;
				});
		}
		return true;
	} catch (error) {
		return false;
	}
};

const Prop = ({ page, user }) => {
	const [showOverlay, setShowOverlay] = useState(false);
	const [showLoading, setShowLoading] = useState(false);
	const [error, setError] = useState({
		msg: "Please fill out all fields.",
		status: false,
	});
	const { allProps, setAllProps } = usePropertiesContext();
	const { showings, setShowings } = useShowingsContext();
	const { availability, setAvailability } = useAvailabilityContext();
	const [imgData, setImgData] = useState(null);

	const processInformation = async (e) => {
		e.preventDefault();
		setShowLoading(true);
		const newList = allProps.map((el) => {
			return propertyState.id == el.id ? { ...el, ...propertyState } : el;
		});
		setAllProps([...newList]);
		await newProp();
		setShowLoading(false);
		closeOverlay();
	};

	const deleteItem = async (e) => {
		e.preventDefault();
		const prompt = window.confirm(
			"Are you sure you want to delete this property and all Showings connected to this property?"
		);
		if (prompt) {
			setShowLoading(true);
			const newList = allProps.filter(
				(el) => propertyState.id !== el._id
			);
			const new_availability_list = availability.filter(
				(el) => propertyState.unique !== el.unique
			);
			const [old_availability] = availability.filter(
				(el) => propertyState.unique == el.unique
			);
			const new_showing_list = showings.filter(
				(el) => old_availability.id !== el.propertyId
			);
			// console.log(old_availability._id);

			await removeProp(propertyState.id);
			old_availability &&
				(await deleteAvailability(old_availability._id));
			old_availability && (await deleteShowing(old_availability.id));
			setAllProps([...newList]);
			setAvailability([...new_availability_list]);
			setShowings([...new_showing_list]);
			setShowLoading(false);
			closeOverlay();
		} else {
			// setShowLoading(false);
			// closeOverlay();
		}
	};

	const newProp = async () => {
		let foundError = false;
		let rand = randomId(2);
		let formData;
		if (propertyState.src) {
			formData = new FormData();
			formData.append("file", propertyState.src, propertyState.src?.name);
			const newFileName = propertyState.src?.name.replace(/\s/g, "_");
			propertyState.fileName = newFileName;
		} else {
			formData = new FormData();
		}
		let add = {
			...propertyState,
			id: allProps.length + 1,
			title: propertyState.name,
			unique: `0x${rand}${0}`,
			owner: user.email,
			src: null,
		};

		if (
			add.city == "" ||
			add.name == "" ||
			add.street == "" ||
			add.country == "" ||
			add.units == ""
		) {
			foundError = true;
			setError({
				msg: "Please fill out all fields.",
				status: true,
			});
		} else {
			if (propertyState.src?.name) {
				const fileExtension = propertyState.src?.name.split(".").pop();
				const validImageTypes = ["gif", "jpeg", "png", "jpg", "tiff"];
				foundError = !validImageTypes.includes(fileExtension);

				foundError &&
					setError({
						msg: "You can only upload images",
						status: true,
					});
			}
		}

		if (foundError == false) {
			const add_to_database = await addProperty({
				data: add,
				fd: formData,
			});
			add_to_database &&
				setAllProps([...allProps, { ...add, tempPath: imgData }]);
		}
	};

	const editProps = async (form_obj) => {
		let foundError = false;
		setShowLoading(true);
		let formData;
		if (form_obj.src) {
			formData = new FormData();
			formData.append("file", form_obj.src, form_obj.src?.name);
			const newFileName = form_obj.src?.name.replace(/\s/g, "_");
			form_obj.fileName = newFileName;
		} else {
			formData = new FormData();
		}
		const newData = { ...form_obj, src: null, title: form_obj.name };
		if (
			newData.city == "" ||
			newData.name == "" ||
			newData.street == "" ||
			newData.country == "" ||
			newData.units == ""
		) {
			foundError = true;
			setError({
				msg: "Please fill out all fields.",
				status: true,
			});
		} else {
			const fileExtension = form_obj.src?.name.split(".").pop();
			if (fileExtension) {
				const validImageTypes = ["gif", "jpeg", "png", "jpg", "tiff"];
				foundError = !validImageTypes.includes(fileExtension);

				foundError &&
					setError({
						msg: "You can only upload images",
						status: true,
					});
			}
		}

		if (foundError == false) {
			await updateProperty(
				{ data: { ...newData }, fd: formData },
				form_obj.id
			);

			const keep_old = allProps.filter((el) => {
				if (el._id) {
					return el._id !== form_obj.id;
				} else {
					return el.id !== form_obj.id;
				}
			});
			setAllProps([...keep_old, { ...newData, tempPath: imgData }]);
			setShowLoading(false);
			closeOverlay();
		} else {
			setShowLoading(false);
		}
	};

	const toggleOverlay = (propname = null) => {
		dispatch({ type: "changetitle", payload: propname });
		setShowOverlay(!showOverlay);
	};
	const closeOverlay = () => {
		// dispatch({ type: "changeimg", payload: "imageimg-icon.svg" });
		setShowOverlay(!showOverlay);
		setError(false);
	};
	const [propertyState, dispatch] = useReducer(reducer, initialState);
	// console.log(propertyState);

	const setDetails = (obj, proptitle) => {
		dispatch({ type: "changename", payload: obj.name });
		dispatch({ type: "changestreet", payload: obj.street });
		dispatch({ type: "changeunits", payload: obj.units });
		dispatch({ type: "changecity", payload: obj.city });
		dispatch({ type: "changecountry", payload: obj.country });
		dispatch({ type: "changeimg", payload: obj.fileName });
		dispatch({ type: "changesrc", payload: obj.src });
		dispatch({ type: "changeid", payload: obj._id || obj.id });
		dispatch({ type: "changeunique", payload: obj.unique });
		toggleOverlay(proptitle);
	};

	const imgSrc = `/images/properties/${user.email}`;
	return (
		<Wrapper>
			<H1>{page} </H1>
			<AddItemOverlay show={showOverlay}>
				<form onSubmit={processInformation}>
					<EditWrapper
						propState={propertyState}
						close={closeOverlay}
						img={imgSrc}
						fn={dispatch}
						del={deleteItem}
						add={editProps}
						loadingState={showLoading}
						imgData={imgData}
						editError={setError}
						errorstate={error}
						setImgData={setImgData}
					/>
				</form>
			</AddItemOverlay>

			<PropCardWrapper>
				{allProps.length > 0 ? (
					allProps.map((el, i) => {
						return (
							<PropCards
								key={i}
								bgImg={
									el.tempPath ||
									`/images/properties/${user.email}/${el.fileName}`
								}
								onClick={() => setDetails(el, el.title)}
							>
								<P> {el.title} </P>
								<Span> {el.units} units available </Span>
							</PropCards>
						);
					})
				) : (
					<NewsWrapper>
						<News>
							<p>You haven&apos;t added any property yet!!</p>
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
