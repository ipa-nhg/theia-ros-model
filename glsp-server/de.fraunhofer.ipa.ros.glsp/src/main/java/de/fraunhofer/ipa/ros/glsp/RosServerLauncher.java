package de.fraunhofer.ipa.ros.glsp;

import java.io.IOException;

import org.apache.commons.cli.ParseException;
import org.eclipse.glsp.server.di.ServerModule;
import org.eclipse.glsp.server.launch.DefaultCLIParser;
import org.eclipse.glsp.server.launch.GLSPServerLauncher;
import org.eclipse.glsp.server.launch.SocketGLSPServerLauncher;
import org.eclipse.glsp.server.utils.LaunchUtil;

public final class RosServerLauncher {
   private RosServerLauncher() {}

   @SuppressWarnings("uncommentedmain")
   public static void main(final String[] args) {
      try {
         DefaultCLIParser cliParser = new DefaultCLIParser(args, "ros server");
         LaunchUtil.configure(cliParser);
         int port = cliParser.parsePort();

         ServerModule serverModule = new ServerModule().configureDiagramModule(new RosDiagramModule());
         GLSPServerLauncher launcher = new SocketGLSPServerLauncher(serverModule);
         launcher.start("localhost", port);
      } catch (ParseException | IOException e) {
         e.printStackTrace();
      }
   }

}
