import React, { Component } from 'react';
import { DialogFormSmall, closeModal } from '../common/modal';
import { InputControl } from '../common/form';
import { Employees } from './';

export default class EmployeesForm extends Component {
    state = {
        open: true,
        values: {},

        // Added two arrays for phone and email values separately
        phone: [],
        email: []
    };

    rules = () => Employees.schemaFields();

    async componentDidMount() {
        this.model = await Employees.load(this.props.match.params.id);

        this.setState({
            values: this.model.data()
        });
    }

    saveForm = values => {
        this.model.save(values).then(result => {
            closeModal(this, values);
        });
    };

    onClose = () => {
        closeModal(this);
    };

    onFormValues = values => {
        this.setState({ values });
    };

    onFormErrors = errors => {
        this.setState({ errors });
    };

    // Start: Create new input field for Contact Phone
    createPhoneField = () => {
        return this.state.phone.map((el, i) => 
        <div className="row">
            <InputControl name="phone" label="Contact Phone" />
            <div className="small-btn float-right">
                <button type="button" onClick={this.removePhoneClick.bind(this, i)} className="btn btn-link">
                    -
                </button>
                <button type="button" onClick={this.addClickPhone.bind(this)} className="btn btn-link">
                    +
                </button>
            </div>        
        </div>
        )
    }
    // Add a new value to the phone array in the state
    addClickPhone(){
        this.setState(prevState => ({ phone: [...prevState.phone, '']}))
    }

    // Delete only one element from the phone array (based on the index i)
    removePhoneClick(i){
        let phone = [...this.state.phone];
        phone.splice(i,1);
        this.setState({ phone });
    }
    // End: Create new input field for Contact Phone
    
    
    // Start: Create new input field for Contact Email
    createEmailField = () => {
        return this.state.email.map((el, i) => 
        <div className="row">
            <InputControl name="email" label="Contact Email" />
            <div className="small-btn float-right">
                <button type="button" onClick={this.removeEmailClick.bind(this, i)} className="btn btn-link">
                    -
                </button>
                <button type="button" onClick={this.addClickEmail.bind(this)} className="btn btn-link">
                    +
                </button>
            </div>        
        </div>
        )
    }

    // Add a new value to the email array in the state
    addClickEmail(){
        this.setState(prevState => ({ email: [...prevState.email, '']}))
    }
      
    // Delete only one element from the email array (based on the index i)
    removeEmailClick(i){
         let email = [...this.state.email];
         email.splice(i,1);
         this.setState({ email });
    }
    // End: Create new input field for Contact Email


    render() {
        return (
            <DialogFormSmall
                openDialog={this.state.open}
                title={Employees.resource()}
                rules={this.rules()}
                values={this.state.values}
                errors={this.state.errors}
                onValues={this.onFormValues}
                onErrors={this.onFormErrors}
                onSave={this.saveForm}
                onCancel={this.onClose}
            >
                <div className="row">
                    <InputControl name="name" />
                </div>
                <div className="row">
                    <InputControl name="position" />
                </div>
                <div className="row">
                    <InputControl name="birthday" />
                </div>
                <div className="row">
                    <InputControl name="email" label="Contact Email" />
                    <div className="small-btn float-right">
                        <button type="button" className="btn btn-link">
                            -
                        </button>
                        <button type="button" onClick={this.addClickEmail.bind(this)} className="btn btn-link">
                            +
                        </button>
                    </div>        
                </div>

                {/* This generates a new email field */}
                {this.createEmailField()}

                <div className="row">
                    <InputControl name="phone" label="Contact Phone" />
                    <div className="small-btn float-right">
                        <button type="button" className="btn btn-link">
                            -
                        </button>
                        <button type="button"  onClick={this.addClickPhone.bind(this)} className="btn btn-link">
                            +
                        </button>
                    </div>
                </div>

                {/* This generates a new phone field */}
                {this.createPhoneField()}
                
            </DialogFormSmall>
        );
    }
}
