export const ROS_LANGUAGE_FILE_EXTENSION = '.ros';
export const ROS_LANGUAGE_SERVER_ID = 'RosDsl';
export const ROS_LANGUAGE_SERVER_NAME = 'ROSDSL';

import { GLSPDiagramLanguage } from '@eclipse-glsp/theia-integration/lib/common';

export const RosDsl: GLSPDiagramLanguage = {
    contributionId: 'RosDsl',
    label: 'Ros diagram',
    diagramType: 'ros-diagram',
    fileExtensions: ['.ros']
};
