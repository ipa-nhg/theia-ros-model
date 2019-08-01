/** @jsx svg */
import { svg } from 'snabbdom-jsx';

import { VNode } from "snabbdom/vnode";
import { IView, RenderingContext, SModelElement } from "sprotty/lib";


export class PublisherView implements IView {

    render(model: Readonly<SModelElement>, context: RenderingContext, args?: object): VNode {
        return <rect x="50" y="20" width="150" height="150"
                     style={{ fill: "blue" }} />;
    }

}