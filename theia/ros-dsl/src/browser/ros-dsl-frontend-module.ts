/**
 * Generated using theia-extension-generator
 */

import { ContainerModule } from "inversify";
import {
    CommandContribution,
} from "@theia/core/lib/common";
import { LanguageGrammarDefinitionContribution } from '@theia/monaco/lib/browser/textmate';
import { DiagramConfiguration, DiagramManagerProvider, DiagramManager, LSDiagramCommandContribution, LSDiagramKeybindingContribution } from 'sprotty-theia';
import { FrontendApplicationContribution, OpenHandler, KeybindingContribution, WidgetFactory } from '@theia/core/lib/browser';
import { LanguageClientContribution } from '@theia/languages/lib/browser';

import { RosLanguageClientContribution } from './ros-dsl-client-contribution';
import { RosGrammarContribution } from './ros-dsl-grammar-contribution';

import { RosDiagramConfiguration } from './diagram/ros-diagram-configuration';
import { RosDiagramManager } from './diagram/ros-diagram-manager';
import { RosDiagramLanguageClient } from './diagram/ros-diagram-language-client';


export default new ContainerModule(bind => {
    // add your contribution bindings here

    bind(RosLanguageClientContribution).toSelf().inSingletonScope();
    bind(LanguageClientContribution).toService(RosLanguageClientContribution);
    bind(LanguageGrammarDefinitionContribution).to(RosGrammarContribution).inSingletonScope();

    bind(RosDiagramLanguageClient).toSelf().inSingletonScope();
    bind(CommandContribution).to(LSDiagramCommandContribution).inSingletonScope();
    bind(KeybindingContribution).to(LSDiagramKeybindingContribution).inSingletonScope();

    bind(DiagramConfiguration).to(RosDiagramConfiguration).inSingletonScope();
    bind(RosDiagramManager).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(RosDiagramManager);
    bind(OpenHandler).toService(RosDiagramManager);
    bind(WidgetFactory).toService(RosDiagramManager);
    bind(DiagramManagerProvider).toProvider<DiagramManager>((context) => {
        return () => {
            return new Promise<DiagramManager>((resolve) => {
                let diagramManager = context.container.get<RosDiagramManager>(RosDiagramManager);
                resolve(diagramManager);
            });
        };
});
});
