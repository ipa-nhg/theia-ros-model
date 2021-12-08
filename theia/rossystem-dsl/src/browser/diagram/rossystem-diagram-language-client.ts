import { EditorManager } from "@theia/editor/lib/browser";
import { inject, injectable } from "inversify";
import { DiagramLanguageClient } from "sprotty-theia";
import { RossystemDslClientContribution } from "../rossystem-dsl-client-contribution";

@injectable()
export class RosSystemDiagramLanguageClient extends DiagramLanguageClient {
    constructor(
        @inject(RossystemDslClientContribution) languageClientContribution: RossystemDslClientContribution,
        @inject(EditorManager) editorManager: EditorManager) {        
        super(languageClientContribution, editorManager)
    }
} 
