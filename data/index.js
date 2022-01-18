import home_one from "../public/images/home1.jpg";
import home_two from "../public/images/home2.jpg";
import home_three from "../public/images/home3.jpg";

export const project = {
	title: "Simplee Rent",
    descContent: "seo description content",
};

export const navItems = [
    {title: "Dashboard", alias: "dashboard", icon:"/images/layout.png"},
    {title: "My Properties", alias: "properties", icon:"/images/house.png"},
    {title: "Showings", alias: "showings", icon:"/images/calendar.png"},
];  

export const statistics = [
    {title: "All Properties", image:"/images/prop.png", tempStat: "5", width: 126, height: 126},
    {title: "All Showing", image:"/images/cal.png", tempStat: "4", width: 89, height: 123},
    {title: "Booked Showing", image:"/images/show.png", tempStat: "2", width: 126, height: 126},
];

export const propertiesPlaceHolder = [
    {title:"Property One", units: 1, src: "/images/home1.jpg", fileName: "home1.jpg"},
    {title:"Property Two", units: 4, src: "/images/home2.jpg", fileName: "home2.jpg"},
    {title:"Property Three", units: 5, src: "/images/home3.jpg", fileName: "home3.jpg"},
];