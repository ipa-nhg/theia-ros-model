import { ManhattanEdgeRouter, SChildElement, SEdge, SGraphFactory, SLabel, SModelElementSchema, 
SParentElement, EdgePlacement } from "sprotty";

export class RosModelFactory extends SGraphFactory {

    protected initializeChild(child: SChildElement, schema: SModelElementSchema, parent?: SParentElement): SChildElement {
        console.log('initialize child');
        console.log(child);
        super.initializeChild(child, schema, parent);
        if (child instanceof SEdge) {
            child.routerKind = ManhattanEdgeRouter.KIND;
            child.targetAnchorCorrection = Math.sqrt(5)
        } else if (child instanceof SLabel) {
            child.edgePlacement = <EdgePlacement> {
                rotate: true,
                position: 0.6
            }
        }

        return child
    }
}