import { LanguageGrammarDefinitionContribution, TextmateRegistry } from '@theia/monaco/lib/browser/textmate';
import { injectable } from 'inversify';
import {
    ROSSYSTEM_LANGUAGE_FILE_EXTENSION,
    ROSSYSTEM_LANGUAGE_SERVER_ID, 
    ROSSYSTEM_LANGUAGE_SERVER_NAME
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

 monaco.languages.setLanguageConfiguration(ROSSYSTEM_LANGUAGE_SERVER_ID, this.configuration);

        const rossystemGrammar = require('../../data/rossystem.tmLanguage.json');
        registry.registerTextmateGrammarScope('source.rossystem', {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: rossystemGrammar,
                };
            }
        });
        
        registry.mapLanguageIdToTextmateGrammar(ROSSYSTEM_LANGUAGE_SERVER_ID, 'source.rossystem');
    }

    protected configuration: monaco.languages.LanguageConfiguration = {
        'comments': {
            'lineComment': '//',
            'blockComment': ['/*', '*/']
        },
        'brackets': [
            ['{', '}'],
        ],
        'autoClosingPairs': [
            { 'open': '{', 'close': '}' },
            { 'open': '"', 'close': '"', 'notIn': ['string'] },
            { 'open': '/**', 'close': ' */', 'notIn': ['string'] }
        ],
        'surroundingPairs': [
            { 'open': '{', 'close': '}' },
            { 'open': '[', 'close': ']' },
            { 'open': '(', 'close': ')' },
            { 'open': "'", 'close': "'" },
            { 'open': '"', 'close': '"' },
            { 'open': '`', 'close': '`' }
        ]
    };


}
