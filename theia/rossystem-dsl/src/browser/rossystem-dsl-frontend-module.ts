/**
 * Generated using theia-extension-generator
 */

import { ContainerModule } from "inversify";
import { LanguageGrammarDefinitionContribution } from '@theia/monaco/lib/browser/textmate';
//import { FrontendApplicationContribution, OpenHandler, KeybindingContribution, WidgetFactory } from '@theia/core/lib/browser';
import { LanguageClientContribution } from '@theia/languages/lib/browser';

import { RossystemDslClientContribution } from "./rossystem-dsl-client-contribution";
import { RosSystemDslGrammarContribution } from "./rossystem-dsl-grammar-contribution";



export default new ContainerModule(bind => {
    // add your contribution bindings here

    bind(RossystemDslClientContribution).toSelf().inSingletonScope();
    bind(LanguageClientContribution).toService(RossystemDslClientContribution);
    bind(LanguageGrammarDefinitionContribution).to(RosSystemDslGrammarContribution).inSingletonScope();

});
