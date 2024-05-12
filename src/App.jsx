import React, { useRef, useState } from "react";
import Moveable from "react-moveable";

function useBox () {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [width, setWidth] = useState(500);
    const [height, setHeight] = useState(400);
    const [rotation, setRotation] = useState(0);

    const onDrag = e => {
        setX(x + e.delta[0])
        setY(y + e.delta[1])
    }

    const onResize = ({ width, height, drag }) => {
        setWidth(width);
        setHeight(height)
        drag && onDrag(drag);
    }

    const onRotate = ({ rotation }) => {
        setRotation(rotation)
    }

    return {
        onDrag,
        onResize,
        onRotate,
        style: {
            backgroundColor: 'pink',
            width: width + 'px',
            height: height + 'px',
            transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`
        }
    }
}

const App = () => {
    const targetRef = useRef();
    const { style, onDrag, onResize, onRotate } = useBox();

    return (
        <div className="root">
            <div
                ref={targetRef}
                style={style}
            />
            <Moveable
                target={targetRef}
                draggable
                resizable
                rotatable
                onDrag={onDrag}
                onResize={onResize}
                onRotate={onRotate}
            />
        </div>
    );
}

export default App;
