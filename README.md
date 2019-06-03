# theia-ros-model

Based on https://github.com/TypeFox/theia-xtext-sprotty-example

Requirements:

- java8
- Maven
- node 10
- yarn

Build and start the language server 

```sh
cd de.fraunhofer.ipa.ros.languageServer.parent/
mvn clean package
cd de.fraunhofer.ipa.ros.languageServer.ide/target/
java -jar de.fraunhofer.ipa.ros.languageServer.ide-1.0.0-SNAPSHOT-ls.jar
```

This starts a net socket server on the default port `5008`. 

Start the browser app:

```sh
cd theia/
yarn
cd browser-app/
yarn start
```

Open your browser on `http://localhost:3000`. 

The language rules apply to files with the extension `.ros`. There is an example in the `ws` folder in the repository.

## How to's

### Generate a language server from a Xtext project:

Tutorial: 

https://www.eclipse.org/community/eclipse_newsletter/2017/may/article5.php

The language server was generated with the option "Generate Xtext project from existing Ecore models"

- preferred build system: **Maven**
- build language server: **Regular**
- source layout: **Gradle/Maven**

- When the language server is built with imported Ecore models (they are not inferred from the Xtext), the language URI has to be registered in the StandAlonSetup (`language-server/de.fraunhofer.ipa.ros.rosdsl/src/main/java/de/fraunhofer/ipa/ros/RosDslStandaloneSetup.xtend`):

```java
override register(Injector injector) {
		if (!EPackage.Registry.INSTANCE.containsKey("http://www.ipa.fraunhofer.de/ros")) {
			EPackage.Registry.INSTANCE.put("http://www.ipa.fraunhofer.de/ros", RosPackage.eINSTANCE);
		}		
		super.register(injector)
	}
```

Also a StandAlone Setup bean has to be added to the generation workflow (`language-server/de.fraunhofer.ipa.ros.rosdsl/src/main/java/de/fraunhofer/ipa/ros/GenerateRosDsl.mwe2`):

```java
import org.eclipse.emf.mwe.utils.*

bean = StandaloneSetup {
        platformUri = "${rootPath}"
        scanClassPath = true
        registerGenModelFile = "platform:/resource/de.fraunhofer.ipa.ros.rosdsl/model/ros.genmodel"
    }
```

- After the project has been built with Maven there  might be errors in Eclipse. To remove this, run `Project > Clean`.
  
### Theia extension

#### Generate a Theia extention:
https://github.com/theia-ide/generator-theia-extension

#### CLI tool to manage theia applications:
https://www.npmjs.com/package/@theia/cli

#### How to add syntax highlighting

TextMate coloring:
How to add textmate coloring to a theia extension: https://www.theia-ide.org/doc/textmate  

TextMate manual: https://macromates.com/manual/en/language_grammars

### Editor configuration
in `ros-dsl/src/browser/ros-dsl-grammar-contribution.ts`  
Monaco Editor Configuration:
https://microsoft.github.io/monaco-editor/api/interfaces/monaco.languages.languageconfiguration.html#folding











