# theia-ros-model
Build the language server 

```
cd language-server/
./gradlew build
```

Start the browser app:

```
cd theia/
yarn
cd browser-app/
yarn start
```

The language rules apply to files with the extension `.ros`

## How to's

### Generate a Theia extention:
https://github.com/theia-ide/generator-theia-extension

### CLI tool to manage theia applications:
https://www.npmjs.com/package/@theia/cli

### Generate a language server from a Xtext project:
https://www.eclipse.org/community/eclipse_newsletter/2017/may/article5.php

Notes:

- When the language server is built with imported Ecore models (they are not inferred from the Xtext), the language URI has to be registered in the StandAlonSetup (`language-server/de.fraunhofer.ipa.ros.rosdsl/src/main/java/de/fraunhofer/ipa/ros/RosDslStandaloneSetup.xtend`):

```
override register(Injector injector) {
		if (!EPackage.Registry.INSTANCE.containsKey("http://www.ipa.fraunhofer.de/ros")) {
			EPackage.Registry.INSTANCE.put("http://www.ipa.fraunhofer.de/ros", RosPackage.eINSTANCE);
		}		
		super.register(injector)
	}
```

Also a StandAlone Setup bean has to be added to the generation workflow (`language-server/de.fraunhofer.ipa.ros.rosdsl/src/main/java/de/fraunhofer/ipa/ros/GenerateRosDsl.mwe2`):

```
bean = StandaloneSetup {
        platformUri = "${rootPath}"
        scanClassPath = true
        registerGenModelFile = "platform:/resource/de.fraunhofer.ipa.ros.rosdsl/model/ros.genmodel"
    }
```








