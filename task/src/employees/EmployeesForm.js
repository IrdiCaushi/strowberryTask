import React, { Component } from 'react';
import { DialogFormSmall, closeModal } from '../common/modal';
import { InputControl } from '../common/form';
import { Employees } from './';

export default class EmployeesForm extends Component {
    state = {
        open: true,
        values: {}
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
                        <button type="button" className="btn btn-link">
                            +
                        </button>
                    </div>
                </div>
                <div className="row">
                    <InputControl name="phone" label="Contact Phone" />
                    <div className="small-btn float-right">
                        <button type="button" className="btn btn-link">
                            -
                        </button>
                        <button type="button" className="btn btn-link">
                            +
                        </button>
                    </div>
                </div>
            </DialogFormSmall>
        );
    }
}
