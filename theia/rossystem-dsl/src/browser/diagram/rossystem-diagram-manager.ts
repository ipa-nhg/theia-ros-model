import { QuickPickService, WidgetManager } from '@theia/core/lib/browser';
//import { Workspace } from '@theia/languages/lib/browser';
import { MonacoWorkspace } from '@theia/monaco/lib/browser/monaco-workspace';
import { inject, injectable } from 'inversify';
import { DiagramManager, TheiaFileSaver, LSTheiaSprottyConnector, TheiaSprottyConnector } from 'sprotty-theia';
import { ROSSYSTEM_DIAGRAM_TYPE } from './rossystem-diagram-configuration';
import { RosSystemDiagramLanguageClient } from './rossystem-diagram-language-client';
import { EditorManager } from '@theia/editor/lib/browser';

@injectable()
export class RosSystemDiagramManager extends DiagramManager {

    readonly diagramType = ROSSYSTEM_DIAGRAM_TYPE;
    readonly iconClass = 'fa fa-sitemap';

    _diagramConnector: TheiaSprottyConnector;

    constructor(@inject(RosSystemDiagramLanguageClient) diagramLanguageClient: RosSystemDiagramLanguageClient,
                @inject(TheiaFileSaver) fileSaver: TheiaFileSaver,
                @inject(WidgetManager) widgetManager: WidgetManager,
                @inject(EditorManager) editorManager: EditorManager,
                @inject(MonacoWorkspace) workspace: MonacoWorkspace,
                @inject(QuickPickService) quickPickService: QuickPickService) {
        super();
        this._diagramConnector = new LSTheiaSprottyConnector({diagramLanguageClient, fileSaver, editorManager, widgetManager, workspace, quickPickService, diagramManager: this});
    }

    get diagramConnector() {
        return this._diagramConnector;
    }

    get label() {
        return 'RosSystem diagram';
    }
} 
