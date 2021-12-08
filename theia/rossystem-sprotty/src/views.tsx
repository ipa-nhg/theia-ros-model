/** @jsx svg */
import { svg } from 'snabbdom-jsx';

import { VNode } from "snabbdom/vnode";
import { IView, RenderingContext, SShapeElement, Hoverable, Selectable, SNode, SPort} from "sprotty/lib";
import { injectable } from 'inversify';


@injectable()
export class RosComponentView implements  IView {
render(node: Readonly<SShapeElement & Hoverable & Selectable>, context: RenderingContext): VNode {
    return <g>
        <rect class-sprotty-node={node instanceof SNode} class-sprotty-port={node instanceof SPort}
                class-mouseover={node.hoverFeedback} class-selected={node.selected}
                x="0" y="0" width={Math.max(node.size.width, 0)+50} height={Math.max((node.children.length*20)+50, 0)}></rect>
        {context.renderChildren(node)}
    </g>;
}}


