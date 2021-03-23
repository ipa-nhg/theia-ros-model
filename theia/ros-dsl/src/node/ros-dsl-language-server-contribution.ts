import { BaseLanguageServerContribution, IConnection } from '@theia/languages/lib/node';
import { injectable } from 'inversify';
import * as net from 'net';
import * as glob from 'glob';
import { resolve, join } from 'path';
import { createSocketConnection } from 'vscode-ws-jsonrpc/lib/server';
import {
    ROS_LANGUAGE_SERVER_ID,
    ROS_LANGUAGE_SERVER_NAME
} from '../common';
import { ProcessErrorEvent } from '@theia/process/lib/node/process';

const BUILD_PATH = resolve(join(__dirname, '..', '..', 'build'));


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

    async getLanguageServerJarPath(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            glob(BUILD_PATH + '/*-ls.jar', (err, matches) => {
                if (err || matches.length === 0) {
                    reject(new Error('Could not find the server launcher for ' + this.name));
                    return
                }
                resolve(matches[0])
            });
        })
    }

    async start(clientConnection: IConnection): Promise<void> {
        let socketPort = this.getPort();
        if (socketPort) {
            const socket = new net.Socket();
            socket.connect(socketPort);
            const serverConnection = createSocketConnection(socket, socket, () => {
                socket.destroy();
            });
            this.forward(clientConnection, serverConnection);
        } else {
            const jar_path  = await this.getLanguageServerJarPath();
            const command = 'java';
            const args: string[] = [
                '-jar',
                jar_path
            ];

            const serverConnection = await this.createProcessStreamConnectionAsync(command, args);
            this.forward(clientConnection, serverConnection);
        }
    }

    protected onDidFailSpawnProcess(error: ProcessErrorEvent): void {
        super.onDidFailSpawnProcess(error);
        console.error("Error starting DSL language server.", error)
    }
}
