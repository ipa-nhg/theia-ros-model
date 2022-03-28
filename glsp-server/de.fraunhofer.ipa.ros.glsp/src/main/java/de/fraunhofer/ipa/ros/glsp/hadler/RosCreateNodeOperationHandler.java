package de.fraunhofer.ipa.ros.glsp.hadler;

import java.util.Map;
import java.util.Optional;

import org.eclipse.glsp.graph.DefaultTypes;
import org.eclipse.glsp.graph.GNode;
import org.eclipse.glsp.graph.GPoint;
import org.eclipse.glsp.graph.builder.impl.GNodeBuilder;
import org.eclipse.glsp.server.operations.gmodel.CreateNodeOperationHandler;

public class RosCreateNodeOperationHandler extends CreateNodeOperationHandler {

   public RosCreateNodeOperationHandler() {
      super(DefaultTypes.NODE);
   }

   @Override
   protected GNode createNode(Optional<GPoint> relativeLocation, Map<String, String> args) {
      GNodeBuilder builder = new GNodeBuilder(DefaultTypes.NODE)
         .size(40, 20)
         .addCssClass("ros-node");
      relativeLocation.ifPresent(builder::position);
      return builder.build();
   }

   @Override
   public String getLabel() { return "Ros Node"; }

}
