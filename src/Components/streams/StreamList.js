import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin = (stream) => {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      );
    }
  }

  renderStreamKey = (stream) => stream.userId === this.props.currentUserId ? <small className="ui secondary"> (stream key: {stream.id})</small> : null;

  renderList = () => {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera"></i>
          <div className="content">
            <div className="header">
              <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
              {this.renderStreamKey(stream)}
            </div>
            <div className="description">
              {stream.description}
            </div>
          </div>
        </div>
      );
    });
  }

  renderCreate = () => {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="ui container">
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.renderList()}
        </div>
        {this.renderCreate()}
      </div>
    )
  }
}

const mapStateToProps = ({ streams, auth }) => {
  return {
    streams: Object.values(streams),
    isSignedIn: auth.isSignedIn,
    currentUserId: auth.userId
  };
};

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);