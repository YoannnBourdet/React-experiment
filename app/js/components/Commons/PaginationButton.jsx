import React, { Component, PropTypes } from 'react';

export default class Pagination extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    handleSelect: PropTypes.func.isRequired,
    pageNumber: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
  };

  handleSelect(eventKey) {
    this.props.handleSelect(eventKey);
  }

  render() {
    const { children, pageNumber, selected } = this.props;
    return (
      <li
        className={selected ? 'selected' : null}
        onClick={this.handleSelect.bind(this, pageNumber)}
      >
        {children}
      </li>
    );
  }
}