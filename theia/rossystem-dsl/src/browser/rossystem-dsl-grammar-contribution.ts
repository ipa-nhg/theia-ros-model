import { LanguageGrammarDefinitionContribution, TextmateRegistry } from '@theia/monaco/lib/browser/textmate';
import { injectable } from 'inversify';
import {
    ROSSYSTEM_LANGUAGE_FILE_EXTENSION,
    ROSSYSTEM_LANGUAGE_SERVER_ID, ROSSYSTEM_LANGUAGE_SERVER_NAME
} from '../common';

@injectable()
export class RosSystemDslGrammarContribution implements LanguageGrammarDefinitionContribution {

    registerTextmateLanguage(registry: TextmateRegistry) {
        monaco.languages.register({
            id: ROSSYSTEM_LANGUAGE_SERVER_ID,
            aliases: [
                ROSSYSTEM_LANGUAGE_SERVER_NAME, ROSSYSTEM_LANGUAGE_SERVER_ID
            ],
            extensions: [
                ROSSYSTEM_LANGUAGE_FILE_EXTENSION,
            ],
            mimetypes: [
                'text/rossystem'
            ]
        });

    }
}