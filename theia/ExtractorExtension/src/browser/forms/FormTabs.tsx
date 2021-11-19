import { Tabs, Tab } from "react-materialize";
import FormsWrapper from "./FormsWrapper";
import * as React from 'react';

export default class FormTabs extends React.Component {

    commonFormFields = [
        {name: 'repository', label: 'Git repository'},
        {name: 'branch_optional', label: 'Branch (optional)'},
        {name: 'package', label: 'Package name'},
        {name: 'ros_version', label: 'Ros version (i.e melodic, noetic or foxy)'}

    ];
    
    nodeFormFields = [
        ...this.commonFormFields,
        {name: 'node', label: 'Node name'}
    ];
    
    launchFormFields = [
        ...this.commonFormFields,
        {name: 'launch', label: 'Launch file name'}
    ];

    msgFormFields = [
        {name: 'repository_optional', label: 'Git repository (optional)'},
        {name: 'branch_optional', label: 'Branch (optional)'},
        {name: 'package', label: 'Package name'},
        {name: 'ros_version', label: 'Ros version (i.e melodic, noetic or foxy)'}
    ];

    render() {

        //return <FormsWrapper fields={this.nodeFormFields} removeDisabled={undefined} removeForm={undefined} values={undefined} setValue={undefined} loading={undefined}/>

        return <Tabs>
            <Tab title="Node analysis">
                <FormsWrapper fields={this.nodeFormFields} removeDisabled={undefined} removeForm={undefined} values={undefined} setValue={undefined} loading={undefined}/>
            </Tab>
            <Tab title="Specifications analysis">
                <FormsWrapper fields={this.msgFormFields} removeDisabled={undefined} removeForm={undefined} values={undefined} setValue={undefined} loading={undefined}/>
            </Tab>
        </Tabs>
    }
}
