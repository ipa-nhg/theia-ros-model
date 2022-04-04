package de.fraunhofer.ipa.ros.glsp;

import org.eclipse.glsp.server.di.GModelJsonDiagramModule;
import org.eclipse.glsp.server.di.MultiBinding;
import org.eclipse.glsp.server.diagram.DiagramConfiguration;
import org.eclipse.glsp.server.features.core.model.JsonFileGModelLoader;
import org.eclipse.glsp.server.features.core.model.ModelSourceLoader;
import org.eclipse.glsp.server.operations.OperationHandler;
import org.eclipse.glsp.server.operations.gmodel.LayoutOperationHandler;

import de.fraunhofer.ipa.ros.glsp.hadler.RosCreateNodeOperationHandler;

public class RosDiagramModule extends GModelJsonDiagramModule {

   @Override
   protected Class<? extends DiagramConfiguration> bindDiagramConfiguration() {
      return RosDiagramConfiguration.class;
   }

   @Override
   protected void configureOperationHandlers(final MultiBinding<OperationHandler> binding) {
      super.configureOperationHandlers(binding);
      binding.add(RosCreateNodeOperationHandler.class);
      binding.remove(LayoutOperationHandler.class);
   }

   @Override
   protected Class<? extends ModelSourceLoader> bindSourceModelLoader() {
      return JsonFileGModelLoader.class;
   }

   @Override
   public String getDiagramType() { return "ros-diagram"; }

}
