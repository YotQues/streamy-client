import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStream } from "../../actions"
import history from "../../history";
import StreamForm from "./streamForm";

class StreamCreate extends Component {
  onSubmit = async formValues => {
    await this.props.createStream(formValues);
    history.push("/");
  }

  render() {
    return (
      <div>
        <h3>
          Create a Stream
        </h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { createStream }
)(StreamCreate);