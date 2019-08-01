import { ContainerModule } from 'inversify';
import { LanguageServerContribution } from '@theia/languages/lib/node';
import {RosSystemDslLanguageServerContribution} from "./rossystem-dsl-language-server-contribution";

export default new ContainerModule(bind => {
    bind(LanguageServerContribution).to(RosSystemDslLanguageServerContribution);
});
