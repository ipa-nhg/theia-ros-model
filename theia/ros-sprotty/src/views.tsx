/** @jsx svg */
import { svg } from 'snabbdom-jsx';

import { VNode } from "snabbdom/vnode";
import { IView, RenderingContext, SShapeElement, Hoverable, Selectable, SNode, SPort, Diamond, Point } from "sprotty/lib";
import { injectable } from 'inversify';



@injectable()
export class RosnodeView implements IView {
    render(node: Readonly<SShapeElement & Hoverable & Selectable>, context: RenderingContext): VNode {
        return <g>
            <rect class-sprotty-node={node instanceof SNode} class-sprotty-port={node instanceof SPort}
                class-mouseover={node.hoverFeedback} class-selected={node.selected}
                x="0" y="0" width={Math.max(node.size.width, 0) + 50} height={Math.max((node.children.length * 20) + 50, 0)}></rect>
            
            {context.renderChildren(node)}
        </g>;
    }
}

@injectable()
export class PublisherView implements IView {
    render(node: Readonly<SShapeElement & Hoverable & Selectable>, context: RenderingContext): VNode {
        return <g>
            <rect class-sprotty-node={node instanceof SPort} class-sprotty-port={node instanceof SPort}
                class-mouseover={node.hoverFeedback} class-selected={node.selected}
                x={-7.5} y={42} width={15} height={15}></rect>
            <text className="label sprotty-label" id="ros-diagram_0_sprotty_null.label10" transform=" translate(-38, 50)" opacity="1">scan</text>
            {context.renderChildren(node)}
        </g>;
    }
}

@injectable()
export class SubscriberView implements IView {
    render(node: Readonly<SShapeElement & Hoverable & Selectable>, context: RenderingContext): VNode {
        return <g>
            <rect class-sprotty-node={node instanceof SPort} class-sprotty-port={node instanceof SPort}
                class-mouseover={node.hoverFeedback} class-selected={node.selected}
                x={140} y={42} width={15} height={15}></rect>
            <text className="label sprotty-label" id="ros-diagram_0_sprotty_null.label11" transform=" translate(155, 50)" opacity="1">control_command</text>
            {context.renderChildren(node)}
        </g>;
    }
}

@injectable()
export class ServiceServerView implements IView {
    render(node: Readonly<SShapeElement & Hoverable & Selectable>, context: RenderingContext): VNode {
        const diamond = new Diamond({ height: 15, width: 15, x: Math.max(node.size.width, 0), y: 0 });
        const points = `${svgStr(diamond.topPoint)} ${svgStr(diamond.rightPoint)} ${svgStr(diamond.bottomPoint)} ${svgStr(diamond.leftPoint)}`;
        return <g>
            <polygon class-sprotty-node={node instanceof SPort} class-sprotty-port={node instanceof SPort}
                class-mouseover={node.hoverFeedback} class-selected={node.selected}
                points={points} />
            {context.renderChildren(node)}
        </g>;
    }
}

function svgStr(point: Point) {
    return `${point.x},${point.y}`;
}

@injectable()
export class ServiceClientView implements IView {
    render(node: Readonly<SShapeElement & Hoverable & Selectable>, context: RenderingContext): VNode {
        const diamond = new Diamond({ height: 15, width: 15, x: -15, y: 0 });
        const points = `${svgStr(diamond.topPoint)} ${svgStr(diamond.rightPoint)} ${svgStr(diamond.bottomPoint)} ${svgStr(diamond.leftPoint)}`;
        return <g>
            <polygon class-sprotty-node={node instanceof SPort} class-sprotty-port={node instanceof SPort}
                class-mouseover={node.hoverFeedback} class-selected={node.selected}
                points={points} />
            {context.renderChildren(node)}
        </g>;
    }
}


@injectable()
export class ActionServerView implements IView {
    render(node: Readonly<SShapeElement & Hoverable & Selectable>, context: RenderingContext): VNode {
        const diamond = new Diamond({ height: 15, width: 15, x: Math.max(node.size.width, 0), y: 0 });
        const points = `${svgStr(diamond.topPoint)} ${svgStr(diamond.rightPoint)} ${svgStr(diamond.bottomPoint)} ${svgStr(diamond.leftPoint)}`;
        return <g>
            <polygon class-sprotty-node={node instanceof SNode} class-sprotty-port={node instanceof SPort}
                class-mouseover={node.hoverFeedback} class-selected={node.selected}
                points={points} />
            {context.renderChildren(node)}
        </g>;
    }
}

@injectable()
export class ActionClientView implements IView {
    render(node: Readonly<SShapeElement & Hoverable & Selectable>, context: RenderingContext): VNode {
        const diamond = new Diamond({ height: 15, width: 15, x: -15, y: 0 });
        const points = `${svgStr(diamond.topPoint)} ${svgStr(diamond.rightPoint)} ${svgStr(diamond.bottomPoint)} ${svgStr(diamond.leftPoint)}`;
        return <g>
            <polygon class-sprotty-node={node instanceof SNode} class-sprotty-port={node instanceof SPort}
                class-mouseover={node.hoverFeedback} class-selected={node.selected}
                points={points} />
            {context.renderChildren(node)}
        </g>;
    }
}

/** @injectable()
export class ActionServerView implements IView {
    render(node: Readonly<SShapeElement & Hoverable & Selectable>, context: RenderingContext): VNode {
        return <g>
            <circle class-sprotty-node={node instanceof SPort} class-sprotty-port={node instanceof SPort}
                    class-mouseover={node.hoverFeedback} class-selected={node.selected}
                    r={7} cx={7} cy={7} x={Math.max(node.size.width,0)} y={0}> </circle>
            {context.renderChildren(node)}
        </g>;
    }
}

@injectable()
export class ActionClientView implements IView {
    render(node: Readonly<SShapeElement & Hoverable & Selectable>, context: RenderingContext): VNode {
        return <g>
            <circle class-sprotty-node={node instanceof SPort} class-sprotty-port={node instanceof SPort}
                    class-mouseover={node.hoverFeedback} class-selected={node.selected}
                    r={7} cx={7} cy={7} x={-15} y={0}></circle>
            {context.renderChildren(node)}
        </g>;
    }
}*/