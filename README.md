# theia-ros-model

Based on https://github.com/TypeFox/theia-xtext-sprotty-example

## Local setup

Requirements:

- java8
- Maven 3.6.0: example instructions for the installation can be found [here](https://www.vultr.com/docs/how-to-install-apache-maven-on-ubuntu-16-04), replace the version number with 3.6.0
- node 10: [installation using nvm](https://github.com/nvm-sh/nvm)
- [yarn](https://yarnpkg.com/lang/en/docs/install/#debian-stable)

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

The language rules apply to files with the extensions `.ros` and `.rossystem`. There are examples in the `theia/ws` folder in the repository. The editor should show if there are any errors (syntax such as wrong brackets or keywords), or if a cross-referenced element (such as the communication objects) cannot be resolved. The code generation of the launch file and the componentInterface files should work too.


## Test with Docker
(note: the current version of the Dockerfile is not optimized (e.g. it does not use the Docker cache) and therfore can be improved)

```sh
[sudo] docker build --tag=theia .
[sudo] docker run -p 3000:3000 -ti theia:latest
```

Open your browser on `http://localhost:3000`.

### Structure
- Currently a fork of the [ros-model repository](https://github.com/erogleva/ros-model/tree/language-server) is cloned recursively. This version has additional configuration which is needed for the language servers.
- Additional Maven/Tycho configuration is added only for the `xtext.ide` projects. Example for `de.fraunhofer.ipa.ros.xtext.ide`: https://github.com/erogleva/ros-model/blob/language-server/plugins/de.fraunhofer.ipa.ros.xtext.ide/pom.xml Its goal is to produce an uber/ fat jar which contains all project dependencies. After building the projects with maven, the language server can be found in the `target` folder of the respective project. Its name ends with `-ls.jar` (so that it can be differentiated from the regular jar). These are the only artifacts from the repository needed for Theia.
- A Theia app is composed of the so called *extensions* (see the [Theia documentation](https://www.theia-ide.org/docs/authoring_extensions) for a more detailed explanation). Currently there are two extensions: `ros-dsl` and `rossystem-dsl` for the `ros` and `rossystem` xtext languages respectively.
- Each extension has a `client` and `server` part (the code is located in the `browser` and `node` folders). The node app takes care of starting the language server (this can be seen in `theia/ros-dsl/src/node/ros-dsl-language-server-contribution.ts`)
  

### Issues
- Diagrams:
Until now there are no diagrams (with the `ros-dsl` extension only the node is shown). Diagrams can be added using sprotty
(see https://github.com/eclipse/sprotty and the example above). Sprotty has a client and a server part; the server should be a part of the java plugins (`ros-dsl` has an example setup). To extend this, new elements can be added in the classes of the package `de.fraunhofer.ipa.ros.ide.diagram`.

- Dependency Management (probably the biggest issue):

Adding external Maven dependencies to the projects is not well supported by tycho. The current solution uses this plugin: https://github.com/reficio/p2-maven-plugin (its documentation describes also the issues with the maven/tycho dependencies resolution). The main idea is that with the plugin a p2 site with the necessary external dependencies can be generated. The project which generates the site is `de.fraunhofer.ipa.ros.externalDependencies`; it needs to be called with `mvn p2:site`. The updatesite is located in the target folder of the project and it can be uploded to a HTTP server. For testing puposes, it has been uploaded to http://ros-model.seronet-project.de/external-dependencies/. For development with Eclipse it is necessary to add this site to the target platform (menu Window > Preferences > Plug-in Development and afterwards by adding a Software Site; also, when installing the dependencies, the option "Install required software" should be unchecked).

However, this does not seem stable: the dependencies are added as plugin singletons and they can therefore cause version conflicts when running the apps in Eclipse so they would have to be updated for each new version. Furthermore, adding external dependencies also has implications for the the Eclipse feature. When the feature gets installled, Eclipse has to be able to find the necessary dependencies in the software update sites available in the installation. Therefore either the additional upatesite has to be added or the feature can be built including all dependencies (for further information on how to do this see https://wiki.eclipse.org/Tycho/eclipse-repository). Example for the latter is the `de.fraunhofer.ipa.ros.updatesite` project.

Alternatively, maybe an additional Gradle build can be created as the configuration is much simpler (see the example at the top of the page).

- Language keywords
Currently they are hardcoded in the file `ros-dsl/src/data/ros.tmLanguage.json`. A better solution would be to get these from the language server (see https://www.eclipse.org/forums/index.php/t/1095654/ for ideas how to do this) 

### Links

#### Generate a Theia extention:

https://github.com/theia-ide/generator-theia-extension

#### CLI tool to manage theia applications:
https://www.npmjs.com/package/@theia/cli

#### Syntax Highlighting

TextMate coloring:
How to add textmate coloring to a theia extension: https://www.theia-ide.org/doc/textmate  

TextMate manual: https://macromates.com/manual/en/language_grammars

### Editor configuration
in `ros-dsl/src/browser/ros-dsl-grammar-contribution.ts`
Monaco Editor Configuration:
https://microsoft.github.io/monaco-editor/api/interfaces/monaco.languages.languageconfiguration.html#folding


### Generate a language server from a Xtext project:

Tutorial: 

https://www.eclipse.org/community/eclipse_newsletter/2017/may/article5.php

The language server was generated with the option "Generate Xtext project from existing Ecore models"

- preferred build system: **Maven**
- build language server: **Fat Jar**
- source layout: **plain**

- When the language server is built with imported Ecore models (they are not inferred from the Xtext), the language URI has to be registered in the StandAlonSetup (` plugins/de.fraunhofer.ipa.ros.xtext/src/de/fraunhofer/ipa/ros/RosStandaloneSetup.xtend`):

```java
override register(Injector injector) {

		EPackage.Registry.INSTANCE.put(RosPackage.eNS_URI, RosPackage.eINSTANCE);
		EPackage.Registry.INSTANCE.put(PrimitivesPackage.eNS_URI, PrimitivesPackage.eINSTANCE);
		
		super.register(injector)
	}
```

- After the project has been built with Maven there  might be errors in Eclipse. To remove this, run `Project > Clean`.











