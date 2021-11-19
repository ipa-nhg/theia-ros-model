import * as React from 'react';
import { Row, Icon, Button, TextInput } from 'react-materialize';
//import setValue from "./FormsWrapper";
import 'materialize-css/dist/css/materialize.min.css';
import * as M from "materialize-css";


interface FormProps { // Added this interface for props
    removeDisabled: any,
    removeForm: any,
    values: any,
    setValue: any,
    loading: any,
    fields : any
  }

export default class Form extends React.Component<FormProps> {

    constructor(props: FormProps){
        super(props);

    }

    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    render() {
        return <form>
            <Row className="float-right" key={Math.random().toString(36).substr(2, 9)}>
                <Button small flat 
                    className="grey lighten-4"
                    disabled={this.props.removeDisabled || this.props.loading} 
                    onClick={(event) => {
                        event.preventDefault(); this.props.removeForm(this.props.values.request_id)}} > 
                    <Icon>clear</Icon> 
                </Button>
            </Row>
            
            {this.props.fields.map((field: any) => {
                return <Row key={field.name}>
                    <TextInput 
                    key={field.name}
                    name={field.name} 
                    label={field.label} 
                    id={`${this.props.values.request_id}_${field.name}`} 
                    value={this.props.values[field.name]} 
                    onChange={(event) => this.props.setValue(this.props.values.request_id, event.target)} 
                    disabled={this.props.loading}/>
                </Row>
            })}
        </form>
    }
}
