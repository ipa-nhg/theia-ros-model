import Form from "./Form";
import {Button, Icon, Preloader, Row} from "react-materialize";
import * as cuid from "cuid";
import {eventTypes} from "../constants";
//import {eventTypes, errorMessages} from "../constants";
import Observer from '../observer';
import API from '../api'
import * as React from 'react';

interface FormsWrapperProps { // Added this interface for props
    removeDisabled: any,
    removeForm: any,
    values: any,
    setValue: any,
    loading: any,
    fields : any
  }


class Forms extends React.Component<FormsWrapperProps, {forms: any, loading: Boolean, errors: any, fields: any}> {


    
    constructor(props: FormsWrapperProps) {
        super(props);

        this.state = {
            loading: false,
            forms: [],
            errors: [],
            fields: []
        }

        this.handleEvent = this.handleEvent.bind(this);  

    }

    handleEvent(){  
        console.log(this.props);  
     }  

    defaultFormState = () => {
        const fieldsState = this.props.fields.reduce((prev: any, curr: any) => {
            return Object.assign({}, prev, {[curr.name]: ''}) 
        }, {});

        return {
            ...fieldsState,
            request_id: cuid(),
        }
    };

    addForm = () => {
        this.setState(prevState => {
            return {
                forms: [...prevState.forms, this.defaultFormState()]
            }
        })
    };

    removeForm = (request_id: any) => {
        this.setState(prevState => {
            return {
                forms: prevState.forms.filter((form: any) => form.request_id !== request_id)
            }
        })
    };

    setValue = (request_id: any, target: any) => {
        this.setState(prevState => {
            return {
                forms: prevState.forms.map((form: any) => {
                    if (form.request_id !== request_id) {
                        return form
                    }
                    return {...form, [target.name]: target.value}
                })
            }
        })
    };

    dismissErrors = () => {
        this.setState({errors: []})
    };

    sendRequest = async (forms: any) => {
        try {
            await API.connect();
            API.sendMessage(forms)
        } catch (e) {
            console.log(e);
        }
    };

    handleSubmit = () => {
        // check if some the values are empty
        //for (let form of this.state.forms) {
            //if (Object.values(form).some(value => !value)) {
            //    Observer.execute(eventTypes.VALIDATION_ERROR, {message: errorMessages.INVALID_FIELDS()});
                //return
            //}

            /**Object.entries(form).forEach(function check_optional(fields){
                if (!fields[0].includes('optional') && fields[1]==""){
                    Observer.execute(eventTypes.VALIDATION_ERROR, {message: errorMessages.MISSING_FIELD(fields[0])})
                    return
                }
            })*/

        //}

        // dismiss previous errors
        this.dismissErrors();

        
        const forms : (any)[] = [];

        // reset the id
        this.state.forms.map((form: any)  => {
            const newId = cuid();
            forms.push({...form, request_id: newId})
        });

        this.sendRequest(forms);
        this.setState({forms})
    };

    startLoading = () => {
        this.setState({loading: true})
    };

    stopLoading = () => {
        this.setState({loading: false})
    };

    componentDidMount() {
        this.addForm();

        Observer.subscribe(eventTypes.SOCKET_ON_OPEN, this.startLoading);
        Observer.subscribe(eventTypes.SOCKET_ON_ERROR, this.stopLoading);
        Observer.subscribe(eventTypes.SOCKET_ON_CLOSE, this.stopLoading);
    }

    componentWillUnmount() {
        Observer.unsubscribe(eventTypes.SOCKET_ON_OPEN, this.startLoading);
        Observer.unsubscribe(eventTypes.SOCKET_ON_ERROR, this.stopLoading);
        Observer.unsubscribe(eventTypes.SOCKET_ON_CLOSE, this.stopLoading);
    }

    render() {

        const removeDisabled = this.state.forms.length < 2;

        return <div>
            {this.state.loading && <Preloader size="big" flashing/>}
            {this.state.forms.map((form: any) => {
                return <Form
                    removeDisabled={removeDisabled}
                    removeForm={this.removeForm}
                    values={form}
                    setValue={this.setValue}
                    loading={this.state.loading}
                    fields={this.props.fields}
                />
            })}
            <Row className='float-right'>
                <Button onClick={this.addForm}> <Icon> add </Icon> </Button>
            </Row>
            <Row>
                <Button waves="light"  onClick={this.handleSubmit}> Submit <Icon
                    right> send </Icon></Button>
            </Row>
        </div>
    }
}
export default Forms;
