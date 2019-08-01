import { Container, ContainerModule } from "inversify";
import 'sprotty-theia/css/theia-sprotty.css';
import 'sprotty/css/sprotty.css';
import {
    boundsModule,
    buttonModule,
    configureModelElement,
    ConsoleLogger,
    defaultModule,
    expandModule,
    exportModule,
    fadeModule,
    hoverModule,
    HtmlRoot,
    HtmlRootView,
    LogLevel,
    modelSourceModule,
    moveModule,
    openModule,
    overrideViewerOptions,
    PreRenderedElement,
    PreRenderedView,
    RectangularNodeView,
    selectModule,
    SGraph,
    SGraphView,
    SLabel,
    SLabelView,
    TYPES,
    undoRedoModule,
    viewportModule,
    updateModule,
    RectangularNode,
    decorationModule,
    edgeEditModule,
    edgeLayoutModule,
    labelEditModule,
    routingModule,
    SModelRoot,
    SRoutingHandle,
    SRoutingHandleView
} from 'sprotty';
import "../css/diagram.css";
import { RosModelFactory } from "./model";
// import { RosModelFactory } from "./model";

const rosDiagramModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
    rebind(TYPES.LogLevel).toConstantValue(LogLevel.warn);
    rebind(TYPES.IModelFactory).to(RosModelFactory);

    const context = { bind, unbind, isBound, rebind };
    configureModelElement(context, 'graph', SGraph, SGraphView);
    configureModelElement(context, 'node', RectangularNode, RectangularNodeView);
    configureModelElement(context, 'label', SLabel, SLabelView);
    configureModelElement(context, 'html', HtmlRoot, HtmlRootView);
    configureModelElement(context, 'pre-rendered', PreRenderedElement, PreRenderedView);
    configureModelElement(context, 'palette', SModelRoot, HtmlRootView);
    configureModelElement(context, 'routing-point', SRoutingHandle, SRoutingHandleView);
    configureModelElement(context, 'volatile-routing-point', SRoutingHandle, SRoutingHandleView);
});

export function createRosDiagramContainer(widgetId: string): Container {
    const container = new Container();
    container.load(defaultModule, selectModule, moveModule, boundsModule, undoRedoModule, viewportModule,
        hoverModule, fadeModule, exportModule, expandModule, openModule, buttonModule, modelSourceModule,
        decorationModule, edgeEditModule, edgeLayoutModule, labelEditModule, updateModule, routingModule,
        rosDiagramModule);
    overrideViewerOptions(container, {
        needsClientLayout: true,
        needsServerLayout: false,
        baseDiv: widgetId,
        hiddenDiv: widgetId + '_hidden'
    });
    return container;
}