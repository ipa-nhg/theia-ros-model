import { BaseLanguageServerContribution, IConnection } from '@theia/languages/lib/node';
import { injectable } from 'inversify';
import * as net from 'net';
import { resolve, join } from 'path';
import { createSocketConnection } from 'vscode-ws-jsonrpc/lib/server';
import { ROS_LANGUAGE_SERVER_ID, ROS_LANGUAGE_SERVER_NAME } from '../common';
import { ProcessErrorEvent } from '@theia/process/lib/node/process';

const LANGUAGE_SERVER_JAR = 'de.fraunhofer.ipa.ros.languageServer.ide-1.0.0-SNAPSHOT-ls.jar';
const JAR_PATH = resolve(join(__dirname, '..', '..', 'build', LANGUAGE_SERVER_JAR));


@injectable()
export class RosLanguageServerContribution extends BaseLanguageServerContribution {

    readonly id = ROS_LANGUAGE_SERVER_ID;
    readonly name = ROS_LANGUAGE_SERVER_NAME;

    getPort(): number | undefined {
        let arg = process.argv.filter(arg => arg.startsWith('--ROS_LSP='))[0];
        if (!arg) {
            return undefined;
        } else {
            return Number.parseInt(arg.substring('--ROS_LSP='.length), 10);
        }
    }

    start(clientConnection: IConnection): void {
        let socketPort = this.getPort();
        if (socketPort) {
            const socket = new net.Socket();
            socket.connect(socketPort);
            const serverConnection = createSocketConnection(socket, socket, () => {
                socket.destroy();
            });
            this.forward(clientConnection, serverConnection);
        } else {
            const command = 'java';
            const args: string[] = [
                '-jar',
                JAR_PATH
            ];

            // this isn't working with Sprotty yet -> only the socket connection is used for now instead (see above)
            this.createProcessStreamConnectionAsync(command, args)
                .then((serverConnection: IConnection) => {
                    this.forward(clientConnection, serverConnection);
                })
                .catch((error) => {
                    super.onDidFailSpawnProcess(error)
                });
        }
    }

    protected onDidFailSpawnProcess(error: ProcessErrorEvent): void {
        super.onDidFailSpawnProcess(error);
        console.error("Error starting DSL language server.", error)
    }
}