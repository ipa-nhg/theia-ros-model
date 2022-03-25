/**import { QuickPickService, WidgetManager } from '@theia/core/lib/browser';
import { Workspace } from '@theia/languages/lib/browser';
import { inject, injectable } from 'inversify';
import { DiagramManager, TheiaFileSaver, LSTheiaSprottyConnector, TheiaSprottyConnector } from 'sprotty-theia';
import { ROS_DIAGRAM_TYPE } from './ros-diagram-configuration';
import { RosDiagramLanguageClient } from './ros-diagram-language-client';
import { EditorManager } from '@theia/editor/lib/browser';

@injectable()
export class RosDiagramManager extends DiagramManager {

    readonly diagramType = ROS_DIAGRAM_TYPE;
    readonly iconClass = 'fa fa-sitemap';

    _diagramConnector: TheiaSprottyConnector;

    constructor(@inject(RosDiagramLanguageClient) diagramLanguageClient: RosDiagramLanguageClient,
                @inject(TheiaFileSaver) fileSaver: TheiaFileSaver,
                @inject(WidgetManager) widgetManager: WidgetManager,
                @inject(EditorManager) editorManager: EditorManager,
                @inject(Workspace) workspace: Workspace,
                @inject(QuickPickService) quickPickService: QuickPickService) {
        super();
        this._diagramConnector = new LSTheiaSprottyConnector({diagramLanguageClient, fileSaver, editorManager, widgetManager, workspace, quickPickService, diagramManager: this});
    }

    get diagramConnector() {
        return this._diagramConnector;
    }

    get label() {
        return 'Ros diagram';
    }
} */
