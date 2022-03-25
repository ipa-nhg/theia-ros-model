// @ts-ignore
import { createRosDiagramContainer } from 'ros-glsp';

import {
    configureDiagramServer,
    GLSPDiagramConfiguration,
    GLSPTheiaDiagramServer,
    TheiaDiagramServer
} from '@eclipse-glsp/theia-integration/lib/browser';
import { Container, injectable } from 'inversify';
//import 'sprotty-theia/css/theia-sprotty.css';
import { RosDsl} from '../../common/index';

@injectable()
export class RosDiagramConfiguration extends GLSPDiagramConfiguration {
    diagramType: string = RosDsl.diagramType;

    doCreateContainer(widgetId: string): Container {
        const container = createRosDiagramContainer(widgetId);
        configureDiagramServer(container, GLSPTheiaDiagramServer);
        container.bind(TheiaDiagramServer).toService(GLSPTheiaDiagramServer);
        return container;
    }
}
