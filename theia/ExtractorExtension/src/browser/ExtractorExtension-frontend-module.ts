import { ContainerModule } from 'inversify';
import { ExtractorExtensionWidget } from './ExtractorExtension-widget';
import { ExtractorExtensionContribution } from './ExtractorExtension-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    bindViewContribution(bind, ExtractorExtensionContribution);
    bind(FrontendApplicationContribution).toService(ExtractorExtensionContribution);
    bind(ExtractorExtensionWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: ExtractorExtensionWidget.ID,
        createWidget: () => ctx.container.get<ExtractorExtensionWidget>(ExtractorExtensionWidget)
    })).inSingletonScope();
});
