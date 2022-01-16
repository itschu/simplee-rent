import {Wrapper, UnOrderedList, ListItem, Anchor} from "./style";
import {navItems} from "../../../data";
import Image from "next/image";
import Link from "next/link";

const Navigation = ({page}) => {
    return(
        <Wrapper>
            <UnOrderedList>
                {navItems.map((el, i) => {
                    const status = (page == el.alias) ? true : false;
                    return <ListItem  key={i} active={status}>
                        <Link href={`/account/${el.alias}`}> 
                            <Anchor>
                                <Image width={20} height={20} src={el.icon} alt={`${el.title} icon`} />
                                &nbsp;&nbsp;
                                {el.title}
                            </Anchor>
                        </Link>
                    </ListItem>
                } )}
            </UnOrderedList>
        </Wrapper>
    )
}

export default Navigation;