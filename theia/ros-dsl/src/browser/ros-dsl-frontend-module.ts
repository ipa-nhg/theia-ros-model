/**
 * Generated using theia-extension-generator
 */

import { RosDslCommandContribution, RosDslMenuContribution } from './ros-dsl-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";

import { LanguageClientContribution } from '@theia/languages/lib/browser';
import { RosLanguageClientContribution } from './ros-dsl-client-contribution';
import { LanguageGrammarDefinitionContribution } from '@theia/monaco/lib/browser/textmate';
import { RosGrammarContribution } from './ros-dsl-grammar-contribution';

import { ContainerModule } from "inversify";

export default new ContainerModule(bind => {
    // add your contribution bindings here
    
    bind(CommandContribution).to(RosDslCommandContribution);
    bind(MenuContribution).to(RosDslMenuContribution);

    bind(LanguageClientContribution).to(RosLanguageClientContribution).inSingletonScope();
    bind(LanguageGrammarDefinitionContribution).to(RosGrammarContribution).inSingletonScope();
    
});