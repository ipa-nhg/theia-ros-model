package de.fraunhofer.ipa.ros.ide.launch

import org.eclipse.sprotty.xtext.launch.DiagramServerSocketLauncher

class RosSocketServer extends DiagramServerSocketLauncher {
	
	override createSetup() {
		new RosLanguageServerSetup
	}

	def static void main(String... args) {
		new RosSocketServer().run(args)
	}
}