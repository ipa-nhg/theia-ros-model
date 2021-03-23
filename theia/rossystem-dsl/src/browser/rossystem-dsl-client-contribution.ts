import {LanguageClientFactory, Languages, Workspace} from '@theia/languages/lib/browser';
import { inject, injectable, multiInject } from 'inversify';
import {
    ROSSYSTEM_LANGUAGE_SERVER_NAME,
    ROSSYSTEM_LANGUAGE_SERVER_ID,
    ROSSYSTEM_LANGUAGE_FILE_EXTENSION
} from '../common';

import { DiagramLanguageClientContribution, DiagramManagerProvider } from 'sprotty-theia';

@injectable()
export class RossystemDslClientContribution extends DiagramLanguageClientContribution {

    readonly id = ROSSYSTEM_LANGUAGE_SERVER_ID;
    readonly name = ROSSYSTEM_LANGUAGE_SERVER_NAME;

    constructor(
        @inject(Workspace) protected readonly workspace: Workspace,
        @inject(Languages) protected readonly languages: Languages,
        @inject(LanguageClientFactory) protected readonly languageClientFactory: LanguageClientFactory,
        @multiInject(DiagramManagerProvider) protected diagramManagerProviders: DiagramManagerProvider[]
    ) {
        super(workspace, languages, languageClientFactory, diagramManagerProviders);
    }

    protected get globPatterns(): string[] {
        return [
            '**/*' + ROSSYSTEM_LANGUAGE_FILE_EXTENSION,
        ];
    }

    protected get documentSelector(): string[] {
        return [
            ROSSYSTEM_LANGUAGE_SERVER_ID
        ];
    }
}
