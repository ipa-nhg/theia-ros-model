import { LanguageGrammarDefinitionContribution, TextmateRegistry } from '@theia/monaco/lib/browser/textmate';
import { injectable } from 'inversify';
import { ROS_LANGUAGE_FILE_EXTENSION, ROS_LANGUAGE_SERVER_ID, ROS_LANGUAGE_SERVER_NAME } from '../common';

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
                'text/rosdsl'
            ]
        });
    }
}