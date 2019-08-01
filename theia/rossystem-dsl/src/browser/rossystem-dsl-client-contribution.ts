import {LanguageClientFactory, Languages, Workspace, BaseLanguageClientContribution} from '@theia/languages/lib/browser';
import {inject, injectable} from 'inversify';
import {
    ROSSYSTEM_LANGUAGE_SERVER_NAME,
    ROSSYSTEM_LANGUAGE_SERVER_ID,
    ROSSYSTEM_LANGUAGE_FILE_EXTENSION
} from '../common';


@injectable()
export class RossystemDslClientContribution extends BaseLanguageClientContribution {

    readonly id = ROSSYSTEM_LANGUAGE_SERVER_ID;
    readonly name = ROSSYSTEM_LANGUAGE_SERVER_NAME;

    constructor(
        @inject(Workspace) protected readonly workspace: Workspace,
        @inject(Languages) protected readonly languages: Languages,
        @inject(LanguageClientFactory) protected readonly languageClientFactory: LanguageClientFactory
    ) {
        super(workspace, languages, languageClientFactory);
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