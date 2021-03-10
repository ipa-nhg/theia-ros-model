FROM maven:3.6.0-ibmjava-8-alpine as java-mvn-base

COPY ros-model ros-model
WORKDIR ros-model/plugins
RUN mvn clean package -f de.fraunhofer.ipa.ros.parent
FROM node:10

COPY --from=java-mvn-base /opt/ibm/java/ /opt/ibm/java/
ENV JAVA_HOME /opt/ibm/java/jre
ENV PATH /opt/ibm/java/jre/bin:/opt/ibm/java/bin/:$PATH

RUN adduser --disabled-password --gecos '' theia

WORKDIR /home/theia

COPY --from=java-mvn-base ros-model/plugins/de.fraunhofer.ipa.ros.xtext.ide/target ros-model/plugins/de.fraunhofer.ipa.ros.xtext.ide/target
COPY --from=java-mvn-base ros-model/plugins/de.fraunhofer.ipa.rossystem.xtext.ide/target ros-model/plugins/de.fraunhofer.ipa.rossystem.xtext.ide/target

COPY --chown=theia:theia theia theia-app

RUN chown -R theia:theia /home/theia

RUN apt-get update && apt-get install libx11-dev libxkbfile-dev
USER theia
WORKDIR /home/theia/theia-app
RUN yarn --ignore-engines

EXPOSE 3000

CMD ["yarn", "--cwd=browser-app", "start", "--hostname=0.0.0.0"]
