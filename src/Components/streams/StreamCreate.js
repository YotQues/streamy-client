import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from "../../actions"

class StreamCreate extends Component {
  renderError = ({ error, touched, }) => {
    if (touched && error)
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    return null;
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : 'field'}`

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = formValues => {
    this.props.createStream(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} type="text" label="Enter Title" />
        <Field name="description" component={this.renderInput} type="text" label="Enter Description" />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title)
    errors.title = 'You must enter a valid title';
  if (!formValues.description)
    errors.description = 'You must enter a description';
  // if (errors.title || errors.description)
  return errors;

  // return;
};

const formWrapped = reduxForm({
  form: 'streamCreate',
  validate,
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);