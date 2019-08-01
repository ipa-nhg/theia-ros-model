import { ContainerModule } from 'inversify';
import { LanguageServerContribution } from '@theia/languages/lib/node';
import { RosLanguageServerContribution } from './ros-dsl-language-server-contribution';


export default new ContainerModule(bind => {
    bind(LanguageServerContribution).to(RosLanguageServerContribution);
});
