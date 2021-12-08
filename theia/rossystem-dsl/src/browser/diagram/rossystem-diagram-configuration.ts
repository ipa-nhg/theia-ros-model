import { Container, injectable } from "inversify";
import { WorkspaceEditCommand, CompletionLabelEditor, RenameLabelEditor,
    DiagramConfiguration, CodeActionProvider, IRootPopupModelProvider, CodeActionPalettePopupProvider, PaletteMouseListener, DeleteWithWorkspaceEditCommand,
    TheiaDiagramServer, TheiaKeyTool, LSTheiaDiagramServer, LSTheiaDiagramServerProvider } from "sprotty-theia";
import { KeyTool, TYPES, configureCommand } from 'sprotty';
import { createRosSystemDiagramContainer } from 'rossystem-sprotty/lib/di.config';
import { RosSystemDiagramServer } from './rossystem-diagram-server';

export const ROSSYSTEM_DIAGRAM_TYPE = 'rossystem-diagram';

@injectable()
export class RosSystemDiagramConfiguration implements DiagramConfiguration {
    diagramType = ROSSYSTEM_DIAGRAM_TYPE;

    createContainer(widgetId: string): Container {
        console.log({widgetId})
        const container = createRosSystemDiagramContainer(widgetId); 
        container.bind(RosSystemDiagramServer).toSelf().inSingletonScope();
        container.bind(TheiaDiagramServer).toService(RosSystemDiagramServer);
        container.bind(LSTheiaDiagramServer).toService(RosSystemDiagramServer);
        container.bind(TYPES.ModelSource).toService(TheiaDiagramServer);
        container.rebind(KeyTool).to(TheiaKeyTool).inSingletonScope();

        container.bind(LSTheiaDiagramServerProvider).toProvider<LSTheiaDiagramServer>((context: any) => {
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
