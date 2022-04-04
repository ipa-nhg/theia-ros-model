import { ContainerModule } from 'inversify';
import { RosLanguageServerContribution } from './ros-dsl-language-server-contribution';
import { GLSPServerContribution } from '@eclipse-glsp/theia-integration/lib/node';


export default new ContainerModule(bind => {
    bind(RosLanguageServerContribution).toSelf().inSingletonScope();
    bind(GLSPServerContribution).toService(RosLanguageServerContribution);
});