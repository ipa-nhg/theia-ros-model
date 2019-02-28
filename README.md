# theia-ros-model

Based on https://github.com/TypeFox/theia-xtext-sprotty-example

Build the language server 

```sh
cd language-server/
./gradlew build
```

Start the browser app:

```sh
cd theia/
yarn
cd browser-app/
yarn start
```

The language rules apply to files with the extension `.ros`

## How to's

### Generate a language server from a Xtext project:

Tutorial: 

https://www.eclipse.org/community/eclipse_newsletter/2017/may/article5.php

The language server was generated with the option "Generate Xtext project from existing Ecore models" (Xtext version 2.16).

- preferred build system: **Gradle**
- build language server: **Regular**
- source layout: **Gradle/Maven**

Notes:

- The tutorial suggests adding the ShadowJar plugin in order to create a fat jar - with Xtext 2.16 this does not seem to be needed anymore, instead the option `build language server`: **Fat Jar** can be selected. The option **Regular** uses the Gradle **application plugin** which packages the application as zip/tar and creates OS specific start scripts. https://docs.gradle.org/current/userguide/application_plugin.html 

- EMF classes:
  
  - The original ros.ecore and ros.genmodel files were added to `de.fraunhofer.ipa.ros.rosdsl/model`.

  - The EMF classes generation was added to the mwe2 workflow (generated in src/main/emf-gen:
in `language-server/de.fraunhofer.ipa.ros.rosdsl/src/main/java/de/fraunhofer/ipa/ros/GenerateRosDsl.mwe2`

```java
import org.eclipse.emf.mwe.utils.*
import org.eclipse.emf.mwe2.ecore.*

...
component = DirectoryCleaner {
		directory ="src/main/emf-gen"
	}
    
    component = EcoreGenerator {
        genModel = "platform:/resource/de.fraunhofer.ipa.ros.rosdsl/model/ros.genmodel"
        srcPath = "platform:/resource/de.fraunhofer.ipa.ros.rosdsl/emf-gen"
    }
```

  - Change model directory in the ros.ecore file to the main folder:
```xml
<genmodel:GenModel modelDirectory="/de.fraunhofer.ipa.ros.rosdsl/src/main/emf-gen">
```

 -  Add `emf-gen` to the gradle source sets in `language-server/gradle/source-layout.gradle` 

 ```
 main {
		java.srcDirs = ['src/main/java', 'src/main/xtext-gen', 'src/main/emf-gen']
		resources.srcDirs = ['src/main/resources', 'src/main/xtext-gen', 'src/main/emf-gen']
		xtendOutputDir = 'src/main/xtend-gen'
	}
 ```

Afterwards, run either `./gradlew build` or `Generate Xtext Artifacts` in Eclipse: this should generate the necessary Xtend and Java files.

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

The `.ecore` file has also been added to the same file as `referencedResource`:

```java
referencedResource = "platform:/resource/de.fraunhofer.ipa.ros.rosdsl/model/ros.ecore"
```

- After the project has been built with Gradle, there  might be errors in Eclipse. To remove this, run `Project > Clean`.
  
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











