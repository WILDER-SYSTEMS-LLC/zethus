import React from 'react';
import _ from 'lodash';

import { ROS_SOCKET_STATUSES } from '../utils';
import VizListItem from './vizListItem';

export const CONNECTION_DOT_CLASSES = {
  [ROS_SOCKET_STATUSES.INITIAL]: 'initial',
  [ROS_SOCKET_STATUSES.CONNECTING]: 'connecting',
  [ROS_SOCKET_STATUSES.CONNECTED]: 'connected',
  [ROS_SOCKET_STATUSES.CONNECTION_ERROR]: 'error',
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rosEndpoint: 'ws://10.81.1.116:9090',
    };
    this.onRosSubmit = this.onRosSubmit.bind(this);
    this.updateRosEndpoint = this.updateRosEndpoint.bind(this);
    this.removeDisplayType = this.removeDisplayType.bind(this);
  }

  onRosSubmit(e) {
    e.preventDefault();
    const { rosEndpoint } = this.state;
    const { connectRos, disconnectRos, rosStatus } = this.props;

    if (rosStatus === ROS_SOCKET_STATUSES.CONNECTED) {
      disconnectRos();
    } else if (
      rosStatus === ROS_SOCKET_STATUSES.INITIAL ||
      rosStatus === ROS_SOCKET_STATUSES.CONNECTION_ERROR
    ) {
      connectRos(rosEndpoint);
    }
  }

  updateRosEndpoint(e) {
    this.setState({
      rosEndpoint: e.target.value,
    });
  }

  removeDisplayType(id) {
    const { removeDisplayType } = this.props;
    removeDisplayType(id);
  }

  render() {
    const { ros, rosStatus, visualizations, toggleAddModal } = this.props;

    const { rosEndpoint } = this.state;
    return (
      <div id="sidebar">
        <div id="logo-wrapper">
          <img id="logo" src="/logo.svg" alt="Zethus" />
        </div>
        <div id="ros-input-section">
          <div id="ros-status">
            <span
              id="ros-status-dot"
              className={CONNECTION_DOT_CLASSES[rosStatus]}
            />
            <span id="ros-status-text">{rosStatus}</span>
          </div>
          <form id="ros-input-flex" onSubmit={this.onRosSubmit}>
            <input
              type="text"
              id="ros-input"
              value={rosEndpoint}
              onChange={this.updateRosEndpoint}
            />
            <button
              id="ros-connect-button"
              className="btn-primary"
              type="submit"
              disabled={rosStatus === ROS_SOCKET_STATUSES.CONNECTING}
            >
              {rosStatus === ROS_SOCKET_STATUSES.CONNECTED
                ? 'Disconnect'
                : 'Connect'}
            </button>
          </form>
        </div>
        <div id="visualzation-list">
          <button
            type="button"
            className="btn-primary"
            onClick={toggleAddModal}
          >
            Add Visualization
          </button>
          {_.size(visualizations) === 0 && (
            <p>No visualizations added to the scene</p>
          )}
          {_.map(visualizations, viz => (
            <VizListItem
              key={viz.id}
              details={viz}
              ros={ros}
              removeDisplayType={this.removeDisplayType}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Sidebar;
