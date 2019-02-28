import { injectable } from "inversify";
import { Action, ActionHandlerRegistry, ReconnectCommand, ComputedBoundsAction  } from "sprotty";
import { LSTheiaDiagramServer } from "sprotty-theia";

@injectable()
export class RosDiagramServer extends LSTheiaDiagramServer {

    initialize(registry: ActionHandlerRegistry) {
        console.log(registry);
        super.initialize(registry);
        registry.register(ReconnectCommand.KIND, this);
        // registry.register(EditLabelAction.KIND, this);
    }

    handleLocally(action: Action): boolean {
        console.log(action);
        if (action.kind === ComputedBoundsAction.KIND){
            const { bounds } = action as ComputedBoundsAction;
            bounds.forEach(element => {
                console.log(element.newBounds)
                console.log('elementId', element.elementId)
            });
        }
        
        return super.handleLocally(action);
    }
}