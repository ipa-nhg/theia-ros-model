import * as React from 'react';
import { injectable, postConstruct, inject } from 'inversify';
//import { AlertMessage } from '@theia/core/lib/browser/widgets/alert-message';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';
//import {InputField } from "@kiwicom/orbit-components/lib/InputField";
import ExampleComponent from './ExtractionComponent';
import FormTabs from './forms/FormTabs'


@injectable()
export class ExtractorExtensionWidget extends ReactWidget {

    static readonly ID = 'ExtractorExtension:widget';
    static readonly LABEL = 'ExtractorExtension Widget';

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    @postConstruct()
    protected async init(): Promise < void> {
        this.id = ExtractorExtensionWidget.ID;
        this.title.label = ExtractorExtensionWidget.LABEL;
        this.title.caption = ExtractorExtensionWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-window-maximize'; // example widget icon.
        this.update();
    }

    /**protected render(): React.ReactNode {
        const header = `This is a sample widget which simply calls the messageService 
        in order to display an info message to end users.`;
        return <div id='widget-container'>
            <AlertMessage type='INFO' header={header} />
            <button className='theia-button secondary' title='Display Message' onClick={_a => this.displayMessage()}>Display Message</button>
 
        </div>
    }*/

    protected render(): React.ReactNode {
        return <FormTabs />;
        return <ExampleComponent />;
    }

    protected displayMessage(): void {
        this.messageService.info('Congratulations: ExtractorExtension Widget Successfully Created!');
    }

    protected handleChange(): void {
        this.messageService.info('Congratulations: ExtractorExtension Widget Successfully Created!');
    }

}
