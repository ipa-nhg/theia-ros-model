import { Container, ContainerModule } from "inversify";
import 'sprotty-theia/css/theia-sprotty.css';
import 'sprotty/css/sprotty.css';
import {
    boundsModule, buttonModule, configureModelElement, ConsoleLogger,
    defaultModule, expandModule, exportModule, fadeModule, hoverModule,
    HtmlRoot, HtmlRootView, LogLevel, modelSourceModule, moveModule,
    openModule, overrideViewerOptions, PreRenderedElement, PreRenderedView,
    selectModule, SGraph, SGraphView, SLabel, SLabelView,
    TYPES, undoRedoModule, viewportModule, updateModule, 
    decorationModule, edgeEditModule, edgeLayoutModule, labelEditModule, RectangularNodeView,
    routingModule, SModelRoot, SRoutingHandle, SRoutingHandleView, RectangularNode, configureCommand, CreateElementCommand
} from 'sprotty';
import "../css/diagram.css";
import { RosSystemModelFactory } from "./model";
//import { RosComponentView } from "./views";

const rossystemDiagramModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
    rebind(TYPES.LogLevel).toConstantValue(LogLevel.warn);
    rebind(TYPES.IModelFactory).to(RosSystemModelFactory);

    const context = { bind, unbind, isBound, rebind };
    configureModelElement(context, 'graph', SGraph, SGraphView);
    configureModelElement(context, 'component', RectangularNode, RectangularNodeView );

    configureModelElement(context, 'label', SLabel, SLabelView);
    configureModelElement(context, 'html', HtmlRoot, HtmlRootView);
    configureModelElement(context, 'pre-rendered', PreRenderedElement, PreRenderedView);
    configureModelElement(context, 'palette', SModelRoot, HtmlRootView);
    configureModelElement(context, 'routing-point', SRoutingHandle, SRoutingHandleView);
    configureModelElement(context, 'volatile-routing-point', SRoutingHandle, SRoutingHandleView);
    configureCommand(context, CreateElementCommand);

});

export function createRosSystemDiagramContainer(widgetId: string): Container {
    const container = new Container();
    container.load(defaultModule, selectModule, moveModule, boundsModule, undoRedoModule, viewportModule,
        hoverModule, fadeModule, exportModule, expandModule, openModule, buttonModule, modelSourceModule,
        decorationModule, edgeEditModule, edgeLayoutModule, labelEditModule, updateModule, routingModule,
        rossystemDiagramModule);
    overrideViewerOptions(container, {
        needsClientLayout: true,
        needsServerLayout: true,
        baseDiv: widgetId,
        hiddenDiv: widgetId + '_hidden'
    });
    return container;
}
