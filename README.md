# theia-ros-model

Based on https://github.com/TypeFox/theia-xtext-sprotty-example

Requirements:

- java8
- Maven
- node 8
- yarn

Clone the repository recursively

```
git clone --recurse-submodules git@gitlab.cc-asp.fraunhofer.de:jfh-er/theia-ros-model.git
```

Build the language server 

```sh
cd ros-model
mvn clean package -f plugins/de.fraunhofer.ipa.ros.parent
```

Start the browser app:

```sh
cd theia/
yarn
cd browser-app/
yarn start
```

Open your browser on `http://localhost:3000`. 

The language rules apply to files with the extensions `.ros` and `.rossystem`. There are examples in the `ws` folder in the repository.

## How to's

### Generate a language server from a Xtext project:

Tutorial: 

https://www.eclipse.org/community/eclipse_newsletter/2017/may/article5.php

The language server was generated with the option "Generate Xtext project from existing Ecore models"

- preferred build system: **Maven**
- build language server: **Fat Jar**
- source layout: **Gradle/Maven**

- When the language server is built with imported Ecore models (they are not inferred from the Xtext), the language URI has to be registered in the StandAlonSetup (` plugins/de.fraunhofer.ipa.ros.xtext/src/de/fraunhofer/ipa/ros/RosStandaloneSetup.xtend`):

```java
override register(Injector injector) {

		if (!EPackage.Registry.INSTANCE.containsKey(RosPackage.eNS_URI)) {
			EPackage.Registry.INSTANCE.put(RosPackage.eNS_URI, RosPackage.eINSTANCE);
		}

		if(!EPackage.Registry.INSTANCE.containsKey(PrimitivesPackage.eNS_URI)) {
			EPackage.Registry.INSTANCE.put(PrimitivesPackage.eNS_URI, PrimitivesPackage.eINSTANCE);
		}

		super.register(injector)
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











