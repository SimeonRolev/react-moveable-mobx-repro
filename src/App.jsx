import React, { useRef, useState } from "react";
import { flushSync } from "react-dom";
import Moveable from "react-moveable";

function useFlushState(initialValue) {
    const [value, _setValue] = useState(initialValue);
    const setValue = v => flushSync(() => _setValue(v))
    return [value, setValue];
}

function useBox() {
    const [x, setX] = useFlushState(0);
    const [y, setY] = useFlushState(0);
    const [width, setWidth] = useFlushState(500);
    const [height, setHeight] = useFlushState(400);
    const [rotation, setRotation] = useFlushState(0);

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
