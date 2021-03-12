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
git clone --recurse-submodules https://github.com/ipa-nhg/theia-ros-model
```

Build the language server 

```sh
cd ros-model
mvn clean package -f plugins/de.fraunhofer.ipa.ros.parent
```

Start the browser app:

```sh
cd theia/
yarn --ignore-engines
yarn rebuild:browser
cd browser-app
yarn start
```

Open your browser on `http://localhost:3000`. 

The language rules apply to files with the extensions `.ros` and `.rossystem`. There are examples in the `theia/ws` folder in the repository. 

#### Current status:
The language server should be started successfully and the connection between the server and the theia app should work. The editor should show if there are any warnings (e.g. the validation check for a node and package names), any errors (syntax such as wrong brackets or keywords), or if a cross-referenced element (such as the communication objects) cannot be resolved. If the communication objects are added in the workspace (as in the example `ws` workspace), they should be resolved correctly. The code generation of the launch file and the componentInterface files should work too.


## Test with Docker
(note: the current version of the Dockerfile is not optimized (e.g. it does not use the Docker cache) and therfore can be improved)

```sh
[sudo] docker build --tag=theia .
[sudo] docker run -p 3000:3000 -ti theia:latest
```

Open your browser on `http://localhost:3000`.

```sh
[sudo] docker build --tag=theia-ros-model .
[sudo] docker-compose up
```
Open your browser on `http://localhost:3000`.

### Structure
The repository consists of two main parts:
- `ros-model`  
  Currently it is a fork of the [ros-model repository](https://github.com/erogleva/ros-model/tree/language-server) which is cloned recursively. This version has additional configuration which is needed for the language servers. The additional Maven/Tycho configuration is added only for the `xtext.ide` projects. Example configuration for `de.fraunhofer.ipa.ros.xtext.ide`: https://github.com/erogleva/ros-model/blob/language-server/plugins/de.fraunhofer.ipa.ros.xtext.ide/pom.xml Its goal is to produce an uber/ fat jar which contains all project dependencies. After building the projects with maven, the language server can be found in the `target` folder of the respective project. Its name ends with `-ls.jar` so that it can be differentiated from the regular jar. These are the only artifacts from the repository needed for Theia.

##### Code changes: 

  When the language server is built with imported Ecore models (they are not inferred from the Xtext), the language URI has to be registered in the StandAlonSetup (`plugins/de.fraunhofer.ipa.ros.xtext/src/de/fraunhofer/ipa/ros/RosStandaloneSetup.xtend`):    

```java
override register(Injector injector) {

		EPackage.Registry.INSTANCE.put(RosPackage.eNS_URI, RosPackage.eINSTANCE);
		EPackage.Registry.INSTANCE.put(PrimitivesPackage.eNS_URI, PrimitivesPackage.eINSTANCE);
		
		super.register(injector)
	}
```

- `theia`  
  A Theia app is composed of multiple *extensions* (see the [Theia documentation](https://www.theia-ide.org/docs/authoring_extensions) for a more detailed explanation). Currently there are two extensions: `ros-dsl` and `rossystem-dsl` for the `ros` and `rossystem` xtext languages respectively. Each extension has a `client` and `server` part (the code is located in the `browser` and `node` folders). 
    - for now, the node app takes care only of starting the language server (this can be seen in `theia/ros-dsl/src/node/ros-dsl-language-server-contribution.ts`). 
    - the browser part specifies the file extension, grammar configurations such as the keywords and adds an initial configuration for the diagrams
  
  In addition, in the `theia` folder there is also a project which contains the diagram configurations for the `ros` language - `ros-sprotty`

There are two options for the communication between the theia app and the language server:
- via standard input/output (this is the current version shown in `theia/ros-dsl/src/node/ros-dsl-language-server-contribution.ts`):
  ```const jar_path  = await this.getLanguageServerJarPath();
     const command = 'java';
     const args: string[] = [
            '-jar',
            jar_path
        ];

    const serverConnection = await this.createProcessStreamConnectionAsync(command, args);
    this.forward(clientConnection, serverConnection);
  ```
- start the language server as a socket server: this option is more suitable for debugging. To start it with Eclipse, create a launch configuration with `RosSocketServer` from the package `de.fraunhofer.ipa.ros.ide.launch` as the main class. Afterwards start the theia browser app with `yarn start:debug` (for `rossystem` this is not implemented yet).

### Issues
- Diagrams:
Until now there are no diagrams (with the `ros-dsl` extension only the node is shown). Diagrams can be added using sprotty
(see https://github.com/eclipse/sprotty and the example above). Sprotty has a client and a server part; the current implementation of the server part is in the package `de.fraunhofer.ipa.ros.ide.diagram`.

- Dependency Management (probably the biggest issue):

1. Creating a fat/uber jar  
   Running a standalone language server requires that the projects are packaged as a fat/uber jar which contains all the project dependencies. However, the standard plugins used in Maven for this ([Assembly](http://maven.apache.org/plugins/maven-assembly-plugin/) and [Shade](https://maven.apache.org/plugins/maven-shade-plugin/)) do not work in Tycho environment as Tycho resolves the dependencies using the system scope and they can not be picked afterwards by the plugins. The current solution uses therefore two additional plugins: `maven-dependency-plugin` with the goal `copy-dependencies` (this copies the dependencies into a `libs` folder inside the `target` directory of the project) and `addjars-maven-plugin` which copies the dependencies of the `libs` folder onto the classpath of the project. (This is also the configuration which can be generated automatically using Eclipse.) The second plugin, however, is old and not maintained anymore and has some issues such as [that it changes the base directory of the project after it is run](https://code.google.com/archive/p/addjars-maven-plugin/issues/8) which can make the addition of new plugins running in the phases afterwards difficult.

2. Adding external Maven dependencies to the projects  
  E.g. the framework with which the diagrams can be made, Sprotty does not have an Eclipse update site since it is a web framework not intented to be used in Eclipse. It can be found only in the Maven repositories and is therefore an external dependency since it cannot be added to the MANIFEST file. Specifying additional dependencies in the `pom.xml` file is not well supported by Tycho. The current solution uses therefore this plugin: https://github.com/reficio/p2-maven-plugin (see its documentation for a more detailed discussion on the problems of the dependency resolution). The main idea is that with the plugin a p2 site with the necessary external dependencies can be generated. The project which generates the site is `de.fraunhofer.ipa.ros.externalDependencies`; it needs to be called with `mvn p2:site`. The updatesite is located in the target folder of the project and it can be uploded to a HTTP server. For testing puposes, it has been uploaded to http://ros-model.seronet-project.de/external-dependencies/. For development with Eclipse it is necessary to add this site to the target platform (menu Window > Preferences > Plug-in Development and afterwards by adding a Software Site (in some cases the opion "Install required software" needs to be unchecked).

	However, this does not seem stable: the dependencies are added as plugin singletons and they can therefore cause version conflicts when running the apps in Eclipse so they would have to be updated for each new version (? not sure if this is entirely correct but I noticed issues when I tried to launch the plugins). Furthermore, adding external dependencies to the projects also has implications for the the Eclipse feature. When the feature gets installled, Eclipse has to be able to find the necessary dependencies in the software update sites available in the installation. Therefore either the additional upatesite has to be added and enabled or the feature can be built including all dependencies (for further information on how to do this see Usage scenarios > Creating a self-contained p2 repository in https://wiki.eclipse.org/Tycho/eclipse-repository). Example for the latter is the `de.fraunhofer.ipa.ros.updatesite` project (also in the `ros-model` fork).


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

### Sprotty documentation
https://github.com/eclipse/sprotty/wiki (unfortunately not very detailed)  
Further information is available here: http://typefox.io/sprotty-a-web-based-diagramming-framework

### Generate a language server from a Xtext project:

Tutorial: 

https://www.eclipse.org/community/eclipse_newsletter/2017/may/article5.php

The language server can be generated with the option "Generate Xtext project from existing Ecore models". Example similar to the current configuration can be seen when running the wizard with the following options:

- preferred build system: **Maven**
- build language server: **Fat Jar**
- source layout: **plain**
