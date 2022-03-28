import { JavaSocketServerContribution, JavaSocketServerLaunchOptions } from '@eclipse-glsp/theia-integration/lib/node';
import { injectable } from 'inversify';
import { resolve, join } from 'path';
import {
    ROS_LANGUAGE_SERVER_ID,
    ROS_LANGUAGE_SERVER_NAME
} from '../common';

import { getPort } from '@eclipse-glsp/protocol';

export const DEFAULT_PORT = 5007;
export const PORT_ARG_KEY = 'WF_GLSP';
export const LOG_DIR = join(__dirname, '..', '..', 'logs');
const JAR_FILE = resolve(
    join(__dirname, '..', '..', '..', '..', 'glsp-server', 'de.fraunhofer.ipa.ros.glsp','target', 'de.fraunhofer.ipa.ros.glsp-0.0.0.jar')
);


@injectable()
export class RosLanguageServerContribution extends JavaSocketServerContribution {


    readonly id = ROS_LANGUAGE_SERVER_ID;
    readonly name = ROS_LANGUAGE_SERVER_NAME;

    createLaunchOptions(): Partial<JavaSocketServerLaunchOptions> {
        return {
            jarPath: JAR_FILE,
            additionalArgs: ['--consoleLog', 'false', '--fileLog', 'true', '--logDir', LOG_DIR],
            socketConnectionOptions: {
                port: getPort(PORT_ARG_KEY, DEFAULT_PORT)
            }
        };
    }
}
