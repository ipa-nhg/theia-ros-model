import { Container, injectable } from "inversify";
import { WorkspaceEditCommand, CompletionLabelEditor, RenameLabelEditor,
    DiagramConfiguration, CodeActionProvider, IRootPopupModelProvider, CodeActionPalettePopupProvider, PaletteMouseListener, DeleteWithWorkspaceEditCommand,
    TheiaDiagramServer, TheiaKeyTool, LSTheiaDiagramServer, LSTheiaDiagramServerProvider } from "sprotty-theia";
import { KeyTool, TYPES, configureCommand } from 'sprotty';
import { createRosDiagramContainer } from 'ros-sprotty/lib/di.config';
import { RosDiagramServer } from './ros-diagram-server';

export const ROS_DIAGRAM_TYPE = 'ros-diagram';

@injectable()
export class RosDiagramConfiguration implements DiagramConfiguration {
    diagramType = ROS_DIAGRAM_TYPE;

    createContainer(widgetId: string): Container {
        console.log({widgetId})
        const container = createRosDiagramContainer(widgetId); 
        container.bind(RosDiagramServer).toSelf().inSingletonScope();
        container.bind(TheiaDiagramServer).toService(RosDiagramServer);
        container.bind(LSTheiaDiagramServer).toService(RosDiagramServer);
        container.bind(TYPES.ModelSource).toService(TheiaDiagramServer);
        container.rebind(KeyTool).to(TheiaKeyTool).inSingletonScope();

        container.bind(LSTheiaDiagramServerProvider).toProvider<LSTheiaDiagramServer>((context) => {
            return () => {
                return new Promise<LSTheiaDiagramServer>((resolve) => {
                    resolve(context.container.get(LSTheiaDiagramServer));
                });
            };
        });

        container.bind(CodeActionProvider).toSelf().inSingletonScope();
        container.bind(IRootPopupModelProvider).to(CodeActionPalettePopupProvider).inSingletonScope();
        container.bind(PaletteMouseListener).toSelf().inSingletonScope();
        container.rebind(TYPES.PopupMouseListener).to(PaletteMouseListener);
        
        configureCommand(container, DeleteWithWorkspaceEditCommand);
        configureCommand(container, WorkspaceEditCommand);

        container.bind(CompletionLabelEditor).toSelf().inSingletonScope();
        container.bind(RenameLabelEditor).toSelf().inSingletonScope();

        return container;
    }
}