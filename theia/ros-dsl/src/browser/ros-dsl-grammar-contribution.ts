import { LanguageGrammarDefinitionContribution, TextmateRegistry } from '@theia/monaco/lib/browser/textmate';
import { injectable } from 'inversify';
import { 
    ROS_LANGUAGE_FILE_EXTENSION, 
    ROS_LANGUAGE_SERVER_ID, 
    ROS_LANGUAGE_SERVER_NAME
} from '../common';

@injectable()
export class RosGrammarContribution implements LanguageGrammarDefinitionContribution {

    registerTextmateLanguage(registry: TextmateRegistry) {
        monaco.languages.register({
            id: ROS_LANGUAGE_SERVER_ID,
            aliases: [
                ROS_LANGUAGE_SERVER_NAME, ROS_LANGUAGE_SERVER_ID
            ],
            extensions: [
                ROS_LANGUAGE_FILE_EXTENSION,
            ],
            mimetypes: [
                'text/ros'
            ]
        });

        monaco.languages.setLanguageConfiguration(ROS_LANGUAGE_SERVER_ID, this.configuration);

        const rosGrammar = require('../../data/ros.tmLanguage.json');
        registry.registerTextmateGrammarScope('source.ros', {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: rosGrammar,
                };
            }
        });
        
        registry.mapLanguageIdToTextmateGrammar(ROS_LANGUAGE_SERVER_ID, 'source.ros');
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
