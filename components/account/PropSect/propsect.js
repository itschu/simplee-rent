import {H1, Wrapper} from '../DashSect/style';
import {H2, InputSeparator, Input, AddProp, PropCards, PropCardWrapper, Span, P, AddItemOverlay, EditWrapper, CloseBtn, Label, UploadContainer, Button, ImgContainer} from './style';
import addImg from '../../../public/images/add.png';
import Image from 'next/image';
import {propertiesPlaceHolder} from '../../../data';
import { useState, useReducer } from 'react';

const initialState = {
    title : "",
    name : "",
    street : "",
    units : 0,
    city : "",
    country : "",
    img : "",
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'changename':
            return {...state, name: action.payload};
        case 'changestreet':
            return {...state, street: action.payload};
        case 'changeunits':
            return {...state, units: action.payload};
        case 'changecity':
            return {...state, city: action.payload};
        case 'changecountry':
            return {...state, country: action.payload};
        case 'changeimg':
            return {...state, img: action.payload};
        case 'changetitle':
            return {...state, title: action.payload};
        default:
            throw new Error();
    }
}

const processInformation = (e) => {
    e.preventDefault();
}

const Prop = ({page}) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const toggleOverlay = (propname=null) => {
        dispatch({type: "changetitle", payload: propname});
        setShowOverlay(!showOverlay);
    };
    const closeOverlay = () => {
        dispatch({type: "changeimg", payload: "imageimg-icon.png"});
        setShowOverlay(!showOverlay);
    };
    const [propertyState, dispatch] = useReducer(reducer, initialState);

    const setDetails = (obj, proptitle) => {
        dispatch({type: "changename", payload: obj.name});
        dispatch({type: "changestreet", payload: obj.street});
        dispatch({type: "changeunits", payload: obj.units});
        dispatch({type: "changecity", payload: obj.city});
        dispatch({type: "changecountry", payload: obj.country});
        dispatch({type: "changeimg", payload: obj.fileName});
        toggleOverlay(proptitle);
    }
    const imgSrc = `/images/${propertyState.img}`;
    return(
        <Wrapper>
            <H1>My {page}. </H1>
            <AddItemOverlay show={showOverlay} >
                <form onSubmit={processInformation}>
                <EditWrapper>
                    <div>
                        <CloseBtn onClick={()=>closeOverlay()}/>

                        <H2>{propertyState.title}</H2>

                        <InputSeparator>
                            <Label>Name</Label>
                            <Input type={"text"} value={propertyState.name} onChange={(e)=> dispatch({type: "changename", payload:e.target.value})} />
                        </InputSeparator>

                        <InputSeparator dg={true}>
                            <div>
                                <Label>Street</Label>
                                <Input type={"text"} value={propertyState.street} onChange={(e)=> dispatch({type: "changestreet", payload:e.target.value})} />
                            </div>
                            
                            <div>
                                <Label>Units</Label>
                                <Input type={"number"} min={0} value={propertyState.units} onChange={(e)=> dispatch({type: "changeunits", payload:e.target.value})} />
                            </div>
                        </InputSeparator>

                        <InputSeparator>
                            <Label>City</Label>
                            <Input type={"text"} value={propertyState.city} onChange={(e)=> dispatch({type: "changecity", payload:e.target.value})}/>
                        </InputSeparator>

                        <InputSeparator>
                            <Label>Country</Label>
                            <Input type={"text"} value={propertyState.country} onChange={(e)=> dispatch({type: "changecountry", payload:e.target.value})}/>
                        </InputSeparator>
                    </div>
                    
                    <UploadContainer>
                        <ImgContainer background={propertyState.img !=='' ? imgSrc : "/images/imageimg-icon.png"}/>
                        <Input type={"file"} size="sm" aria-label="File browser"/>
                        <br/>
                        <div>
                            <Button type='save'>
                                Save
                            </Button>
                            <Button type='delete' prompt="Are yoy">
                                Delete  
                            </Button>
                        </div>
                    </UploadContainer   >
                </EditWrapper>
                </form>
            </AddItemOverlay>

            <PropCardWrapper>
                {
                    propertiesPlaceHolder.map((el, i)=> {
                        return <PropCards key={i} bgImg={el.src} onClick={()=>  setDetails(el, el.title)}>
                           <P> {el.title} </P>
                           <Span> {el.units} units available </Span>
                        </PropCards>
                    })
                }
            </PropCardWrapper>

            <AddProp onClick={()=>toggleOverlay("Add New Property")}>
                <Image src={addImg} alt='add more properties' />
            </AddProp>
        </Wrapper>
    )
};

export default Prop;