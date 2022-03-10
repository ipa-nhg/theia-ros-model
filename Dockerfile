FROM ubuntu:focal
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -y maven git

RUN adduser --disabled-password --gecos '' theia
WORKDIR /home/theia
RUN git clone https://github.com/ipa320/ros-model -b LanguageServer
#COPY --chown=theia:theia ros-model ros-model

WORKDIR ros-model/plugins
RUN mvn clean package -f de.fraunhofer.ipa.ros.parent

WORKDIR /home/theia
RUN git clone https://github.com/ipa-hsd/kinematics-model -b lsp_support
WORKDIR kinematics-model
RUN mvn clean package -U -DskipTests -f de.fraunhofer.ipa.kinematics.xtext.parent

#COPY --from=java-mvn-base /opt/ibm/java/ /opt/ibm/java/
#ENV JAVA_HOME /opt/ibm/java/jre
#ENV PATH /opt/ibm/java/jre/bin:/opt/ibm/java/bin/:$PATH

WORKDIR /home/theia
COPY --chown=theia:theia theia theia-app
COPY --chown=theia:theia ws ws

RUN chown -R theia:theia /home/theia
RUN apt-get update && apt-get install -y nodejs npm
RUN npm install --global yarn
#libx11-dev libxkbfile-dev -y
USER theia
WORKDIR /home/theia/theia-app
RUN yarn cache clean
RUN yarn install --verbose

EXPOSE 3000

CMD ["yarn", "--cwd=browser-app", "start", "--hostname=0.0.0.0"]
