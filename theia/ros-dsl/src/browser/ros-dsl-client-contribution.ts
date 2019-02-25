import { BaseLanguageClientContribution, LanguageClientFactory, Languages, Workspace } from '@theia/languages/lib/browser';
import { inject, injectable } from 'inversify';
import { ROS_LANGUAGE_SERVER_ID, ROS_LANGUAGE_SERVER_NAME, ROS_LANGUAGE_FILE_EXTENSION } from '../common';

@injectable()
export class RosLanguageClientContribution extends BaseLanguageClientContribution {

    readonly id = ROS_LANGUAGE_SERVER_ID;
    readonly name = ROS_LANGUAGE_SERVER_NAME;

    constructor(
        @inject(Workspace) protected readonly workspace: Workspace,
        @inject(Languages) protected readonly languages: Languages,
        @inject(LanguageClientFactory) protected readonly languageClientFactory: LanguageClientFactory
    ) {
        super(workspace, languages, languageClientFactory);
    }

    protected get globPatterns(): string[] {
        return [
            '**/*' + ROS_LANGUAGE_FILE_EXTENSION,
        ];
    }

    protected get documentSelector(): string[] {
        return [
            ROS_LANGUAGE_SERVER_ID
        ];
    }
}