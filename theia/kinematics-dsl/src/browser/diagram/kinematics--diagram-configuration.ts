import { Container, injectable } from "inversify";
import { DiagramConfiguration} from "sprotty-theia";

export const KINEMATICS_DIAGRAM_TYPE = 'kinematics-diagram';

@injectable()
export class KinematicsDiagramConfiguration implements DiagramConfiguration {
    createContainer(widgetId: string): Container {
        throw new Error("Method not implemented.");
    }
    diagramType = KINEMATICS_DIAGRAM_TYPE;

}