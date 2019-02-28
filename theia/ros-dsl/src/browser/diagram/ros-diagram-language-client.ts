import { EditorManager } from "@theia/editor/lib/browser";
import { inject, injectable } from "inversify";
import { DiagramLanguageClient } from "sprotty-theia";
import { RosLanguageClientContribution } from "../ros-dsl-client-contribution";

@injectable()
export class RosDiagramLanguageClient extends DiagramLanguageClient {
    constructor(
        @inject(RosLanguageClientContribution) languageClientContribution: RosLanguageClientContribution,
        @inject(EditorManager) editorManager: EditorManager) {        
        super(languageClientContribution, editorManager)
    }
} 