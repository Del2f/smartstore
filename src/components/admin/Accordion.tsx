import { useRef, useState } from "react";

type Props = {
    title?: string | React.ReactNode;
    className?: any | React.ReactNode;
    contents?: string | React.ReactNode;
};

function Accordion(props: Props) {
    const parentRef = useRef<HTMLUListElement>(null);
    const childRef = useRef<HTMLLIElement>(null);

    const [isCollapse, setIsCollapse] = useState(false);

    const buttonArrow = isCollapse ? "buttonArrow Down" : "buttonArrow Up";

    const ButtonClick = (e: any) => {
        e.stopPropagation();

        if (parentRef.current === null || childRef.current === null) {
            return;
        }

        if (parentRef.current.clientHeight > 0) {
            parentRef.current.style.height = "0px";
        } else {
            parentRef.current.style.height = `${childRef.current.clientHeight}px`;
        }

        setIsCollapse(!isCollapse);
    };

    return (
        <div className="admin-leftMenu-Container">
            <div className="inner" onClick={ButtonClick}>
                <span>{props.title}</span>
                <span className={props.className}>
                    <i className="icon-beta"></i>
                </span>
                <span className={buttonArrow}></span>
            </div>
            <ul className="ContentsWrapper" ref={parentRef}>
                <li className="Contents" ref={childRef}>
                    {props.contents}
                </li>
            </ul>
        </div>
    );
}

export default Accordion;
