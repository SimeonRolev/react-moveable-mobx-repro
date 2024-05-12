import React from "react";
import Moveable from "react-moveable";
import { observer } from 'mobx-react';
import { makeAutoObservable } from 'mobx';

class Box {
    x = 0;
    y = 0;
    width = 500;
    height = 400;
    rotation = 0;

    constructor() {
        makeAutoObservable(this);
    }

    get cssTransform() {
        return `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
    }

    drag(e) {
        this.x += e.delta[0];
        this.y += e.delta[1];
    }

    resize({ width, height, drag }) {
        this.width = width;
        this.height = height;
        drag && this.drag(drag);
    }

    rotate({ rotation }) {
        this.rotation = rotation;
    }
}

const box = new Box();

const App = observer(() => {
    return (
        <div className="root">
            <div
                className='target'
                style={{
                    backgroundColor: 'pink',
                    width: box.width,
                    height: box.height,
                    transform: box.cssTransform
                }}
            />
            <Moveable
                target={'.target'}
                draggable
                resizable
                rotatable
                onDrag={e => box.drag(e)}
                onResize={e => box.resize(e)}
                onRotate={e => box.rotate(e)}
            />
        </div>
    );
})

export default App;
