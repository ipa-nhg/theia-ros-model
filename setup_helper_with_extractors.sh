#!/bin/bash

git clone https://github.com/ipa320/ros-model-extractors -b theia
docker build --tag=haros_melodic -f ros-model-extractors/melodic/Dockerfile --build-arg enable_ssh=true --build-arg path_to_scripts="ros-model-extractors/" --build-arg  path_to_ssh_config="ros-model-cloud/" . 
docker build --tag=haros_noetic -f ros-model-extractors/noetic/Dockerfile --build-arg enable_ssh=true --build-arg path_to_scripts="ros-model-extractors/" --build-arg  path_to_ssh_config="ros-model-cloud/" . 
docker build --tag=haros_foxy -f ros-model-extractors/foxy/Dockerfile --build-arg enable_ssh=true --build-arg path_to_scripts="ros-model-extractors/" --build-arg  path_to_ssh_config="ros-model-cloud/" . 

git clone https://github.com/ipa320/ros-model-cloud -b theia
docker build --tag=extractor_frontend -f ros-model-cloud/extractor-interface/Dockerfile --build-arg path_to_repo_folder="ros-model-cloud/" .
