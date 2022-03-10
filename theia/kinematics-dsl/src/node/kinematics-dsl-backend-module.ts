import { ContainerModule } from 'inversify';
import { LanguageServerContribution } from '@theia/languages/lib/node';
import { KinematicsLanguageServerContribution } from './kinematics-dsl-language-server-contribution';


export default new ContainerModule(bind => {
    bind(LanguageServerContribution).to(KinematicsLanguageServerContribution);
});
