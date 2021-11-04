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
    decorationModule, edgeEditModule, edgeLayoutModule, labelEditModule,
    routingModule, SModelRoot, SRoutingHandle, SRoutingHandleView, RectangularNode
} from 'sprotty';
import "../css/diagram.css";
import { RosModelFactory } from "./model";
import {PublisherView, SubscriberView, ServiceClientView, ServiceServerView, 
    ActionServerView, ActionClientView, RosnodeView} from "./views";

const rosDiagramModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
    rebind(TYPES.LogLevel).toConstantValue(LogLevel.warn);
    rebind(TYPES.IModelFactory).to(RosModelFactory);

    const context = { bind, unbind, isBound, rebind };
    configureModelElement(context, 'graph', SGraph, SGraphView);
    configureModelElement(context, 'node', RectangularNode, RosnodeView);
    //configureModelElement(context, 'port', DiamondNode, PublisherView);
    configureModelElement(context, 'publisher_port', RectangularNode, PublisherView);
    configureModelElement(context, 'subscriber_port', RectangularNode, SubscriberView);
    configureModelElement(context, 'service_server_port', RectangularNode, ServiceServerView);
    configureModelElement(context, 'service_client_port', RectangularNode, ServiceClientView);
    configureModelElement(context, 'action_server_port', RectangularNode, ActionServerView);
    configureModelElement(context, 'action_client_port', RectangularNode, ActionClientView);

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
