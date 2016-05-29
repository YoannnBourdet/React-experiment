/* eslint react/prop-types: 0 */
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as FiltersActions from '../../actions/filters';
import * as CategoriesActions from '../../actions/categories';

import AutoComplete from 'material-ui/AutoComplete';
import FiltersCheckboxes from './FiltersCheckboxes';

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  actions: {
    categories: bindActionCreators(CategoriesActions, dispatch),
    filters: bindActionCreators(FiltersActions, dispatch),
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Filters extends Component {
  state = {
    dataSource: [],
    filter: null,
  };

  handleUpdateInput = (value) => {
    const { actions, categories: { category } } = this.props;
    actions.filters.add('contents', value);

    const query = !value ? {} : {
      nameStartsWith: value,
    };

    actions.categories.fetch(category, query);
  };

  handleUpdateCheckbox = (category) => {
    const { actions } = this.props;
    actions.categories.fetch(category);
  };

  render() {
    return (
      <div className="filters cp-wrapper">
        <AutoComplete
          dataSource={this.state.dataSource}
          filter={AutoComplete.fuzzyFilter}
          floatingLabelText="Type t, fuzzy search"
          fullWidth
          onUpdateInput={::this.handleUpdateInput}
        />
        <FiltersCheckboxes
          items={[
            { label: 'characters', value: 'characters' },
            { label: 'comics', value: 'comics' },
            { label: 'creators', value: 'creators' },
            { label: 'events', value: 'events' },
            { label: 'series', value: 'series' },
            { label: 'stories', value: 'stories' },
          ]}
          onRequest={::this.handleUpdateCheckbox}
        />
      </div>
    );
  }
}
