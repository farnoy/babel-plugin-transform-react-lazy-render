import React from 'react';
import {pull} from 'lodash';
import PropTypes from 'prop-types';

function guidedShallowCompare() {
  if (arguments.length < 3)
    throw 'Need at least three arguments to guidedShallowCompare';

  const lhs = arguments[0];
  const rhs = arguments[1];

  for (let i = 2; i < arguments.length; i++) {
    const guide = arguments[i];

    if (Array.isArray(guide)) {
      for (let j = 0; j < guide.length; j++) {
        if (guidedShallowCompare(lhs, rhs, guide[j]) === false)
          return false;
      }
    } else if (typeof guide === 'object') {
      var keys = Object.keys(guide);
      for (let j = 0; j < keys.length; j++) {
        var elem = keys[j];

        if (guidedShallowCompare(lhs[elem], rhs[elem], guide[elem]) === false)
          return false;
      }
    } else if (typeof guide === 'string') {
      if (lhs[guide] !== rhs[guide])
        return false;
    } else if (guide == null) {
      if (lhs !== rhs)
        return false;
    }
  }

  return true;
}

export default class LazyRender extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps, /* nextState */) {
    const keys = Object.keys(nextProps);
    pull(keys, 'children');
    return !guidedShallowCompare(this.props, nextProps, keys);
  }

  render() {
    return this.props.children.apply(this, [this.props]);
  }
}
