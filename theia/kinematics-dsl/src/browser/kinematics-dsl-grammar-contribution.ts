import { LanguageGrammarDefinitionContribution, TextmateRegistry } from '@theia/monaco/lib/browser/textmate';
import { injectable } from 'inversify';
import { 
    KINEMATICS_LANGUAGE_FILE_EXTENSION, 
    KINEMATICS_LANGUAGE_SERVER_ID, 
    KINEMATICS_LANGUAGE_SERVER_NAME
} from '../common';

@injectable()
export class KinematicsGrammarContribution implements LanguageGrammarDefinitionContribution {

    registerTextmateLanguage(registry: TextmateRegistry) {
        monaco.languages.register({
            id: KINEMATICS_LANGUAGE_SERVER_ID,
            aliases: [
                KINEMATICS_LANGUAGE_SERVER_NAME, KINEMATICS_LANGUAGE_SERVER_ID
            ],
            extensions: [
                KINEMATICS_LANGUAGE_FILE_EXTENSION,
            ],
            mimetypes: [
                'text/kin'
            ]
        });

        monaco.languages.setLanguageConfiguration(KINEMATICS_LANGUAGE_SERVER_ID, this.configuration);

        const kinemticsGrammar = require('../../data/kinematics.tmLanguage.json');
        registry.registerTextmateGrammarScope('source.kin', {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: kinemticsGrammar,
                };
            }
        });
        
        registry.mapLanguageIdToTextmateGrammar(KINEMATICS_LANGUAGE_SERVER_ID, 'source.kin');
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
