package de.fraunhofer.ipa.ros.glsp;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.eclipse.emf.ecore.EClass;
import org.eclipse.glsp.graph.DefaultTypes;
import org.eclipse.glsp.server.diagram.BaseDiagramConfiguration;
import org.eclipse.glsp.server.types.EdgeTypeHint;
import org.eclipse.glsp.server.types.ShapeTypeHint;

public class RosDiagramConfiguration extends BaseDiagramConfiguration {

   @Override
   public Map<String, EClass> getTypeMappings() { return DefaultTypes.getDefaultTypeMappings(); }

   @Override
   public List<ShapeTypeHint> getShapeTypeHints() {
      return List.of(new ShapeTypeHint(DefaultTypes.NODE, true, true, true, false));
   }

   @Override
   public List<EdgeTypeHint> getEdgeTypeHints() { return Collections.emptyList(); }

}
