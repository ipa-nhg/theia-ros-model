/**
 * Generated using theia-extension-generator
 */

import { ContainerModule } from "inversify";
import { LanguageGrammarDefinitionContribution } from '@theia/monaco/lib/browser/textmate';
import { CommandContribution} from "@theia/core/lib/common";
import { DiagramConfiguration, DiagramManagerProvider, DiagramManager, LSDiagramCommandContribution, LSDiagramKeybindingContribution } from 'sprotty-theia';
import { FrontendApplicationContribution, OpenHandler, KeybindingContribution, WidgetFactory } from '@theia/core/lib/browser';
import { LanguageClientContribution } from '@theia/languages/lib/browser';

import { RossystemDslClientContribution } from "./rossystem-dsl-client-contribution";
import { RosSystemDslGrammarContribution } from "./rossystem-dsl-grammar-contribution";

import { RosSystemDiagramConfiguration } from './diagram/rossystem-diagram-configuration';
import { RosSystemDiagramManager } from './diagram/rossystem-diagram-manager';
import { RosSystemDiagramLanguageClient } from './diagram/rossystem-diagram-language-client';


export default new ContainerModule(bind => {
    // add your contribution bindings here

    bind(RossystemDslClientContribution).toSelf().inSingletonScope();
    bind(LanguageClientContribution).toService(RossystemDslClientContribution);
    bind(LanguageGrammarDefinitionContribution).to(RosSystemDslGrammarContribution).inSingletonScope();

    bind(RosSystemDiagramLanguageClient).toSelf().inSingletonScope();
    bind(CommandContribution).to(LSDiagramCommandContribution).inSingletonScope();
    bind(KeybindingContribution).to(LSDiagramKeybindingContribution).inSingletonScope();

    bind(DiagramConfiguration).to(RosSystemDiagramConfiguration).inSingletonScope();
    bind(RosSystemDiagramManager).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(RosSystemDiagramManager);
    bind(OpenHandler).toService(RosSystemDiagramManager);
    bind(WidgetFactory).toService(RosSystemDiagramManager);
    bind(DiagramManagerProvider).toProvider<DiagramManager>((context) => {
        return () => {
            return new Promise<DiagramManager>((resolve) => {
                let diagramManager = context.container.get<RosSystemDiagramManager>(RosSystemDiagramManager);
                resolve(diagramManager);
            });
        };
});
});
