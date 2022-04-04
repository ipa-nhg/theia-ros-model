import { Container, ContainerModule } from 'inversify';
import {
    configureDefaultModelElements,
    ConsoleLogger,
    createClientContainer,
    LogLevel,
    overrideViewerOptions,
    TYPES
} from '@eclipse-glsp/client';
import '../css/diagram.css';

const rosDiagramModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
    rebind(TYPES.LogLevel).toConstantValue(LogLevel.warn);
    //bind(TYPES.ISnapper).to(GridSnapper);
    //bind(TYPES.ICommandPaletteActionProvider).to(RevealNamedElementActionProvider);
    //bind(TYPES.IContextMenuItemProvider).to(DeleteElementContextMenuItemProvider);
    const context = { bind, unbind, isBound, rebind };
    configureDefaultModelElements(context);
});

export default function createContainer(widgetId: string): Container {
    const container = createClientContainer(rosDiagramModule);

    overrideViewerOptions(container, {
        baseDiv: widgetId,
        hiddenDiv: widgetId + '_hidden',
        needsClientLayout: true
    });

    return container;
}
