import { useEffect, useRef, useState } from "react";

type Pos = {
    x: number;
    y: number;
}

type Pod = {
    id: number;
    pos?: Pos;
}

type Node = {
    id: number;
    pos?: Pos;
    pod?: Pod[];
}

const NODE_SIZE = {w: 400, h: 200};
const CANVAS_SIZE = {w: 1400, h: 750};
const GAP_SIZE = 10;



const Canvas = props => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [nodesNumber, setNodesNumber] = useState<number>(0);
    const [nodes, setNodes] = useState<Node[]>([]);
    
    const getNodePosition = (nodeIndex: number) => {
        return ({ x: 10, y: (nodeIndex + 1 ) * GAP_SIZE + (nodeIndex * NODE_SIZE.h)})
    }

    const getPodPosition = () => {
        return ({ x: 0, y: 0})
    }

    const addNode = () => {
        let newNode: Node;
        if (nodes.length === 0) {
            newNode = { id: 0 }
        } else {
            const lastNode = nodes[nodes.length - 1];
            newNode = { id: lastNode.id + 1 }
        }
        
        nodes.push(newNode)
        setNodes(nodes);
        setNodesNumber(nodesNumber + 1);
    }

    const deleteNode = (id: number) => {
        if(nodes.length > 0) {
            const newNodes = nodes.filter(node => node.id !== id);
            setNodes(newNodes);
            setNodesNumber(nodesNumber - 1);
        }
    }

    const draw = (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        nodes.forEach((node, index) => {
            const pos = getNodePosition(index);

            ctx.rect(pos.x, pos.y, NODE_SIZE.w, NODE_SIZE.h);
            ctx.stroke();
        });
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        context?.reset();
        draw(context!!);
    }, [nodesNumber])

    return (
        <>
            <button onClick={ addNode }>Add node</button>
            <button onClick={ () => deleteNode(nodes.length - 1) }>Delete node</button>
            <canvas ref={canvasRef} {...props} width={CANVAS_SIZE.w} height={CANVAS_SIZE.h} style={{ border: "solid" }}/>
        </>
    )
    
}

export default Canvas;