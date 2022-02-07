import { injectable } from "inversify";
import { Action, ActionHandlerRegistry, ReconnectCommand, ComputedBoundsAction } from "sprotty";
import { LSTheiaDiagramServer } from "sprotty-theia";
@injectable()
export class RosSystemDiagramServer extends LSTheiaDiagramServer {

    /**@inject(CompletionLabelEditor)
    completionLabelEditor: CompletionLabelEditor = new CompletionLabelEditor;
    @inject(RenameLabelEditor)
    renameLabelEditor: RenameLabelEditor = new RenameLabelEditor;
    @inject(TYPES.IModelFactory)
    modelFactory!: IModelFactory;*/

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
        /**if (action.kind === EditLabelAction.KIND) {
            const label = this.getElement((action as EditLabelAction).labelId);
            if (label instanceof SLabel && isTraceable(label))
                if (getSubType(label) === 'xref')
                    this.completionLabelEditor.edit(label);
                else
                    this.renameLabelEditor.edit(label);
            return false;
        }*/
        return super.handleLocally(action);
    }

    /*private getElement(elementId: string) {
        const root = (this.currentRoot instanceof SModelRoot)
            ? this.currentRoot
            : this.modelFactory.createRoot(this.currentRoot);
        return root.index.getById(elementId);
    }*/
}