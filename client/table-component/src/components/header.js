import * as React from 'react';
import { Image, DropdownButton, MenuItem } from 'react-bootstrap';
import '../styles/header.css';
import { map } from 'lodash';

const searchIcon = require('../assets/icon_search.svg');

const sortingParams = ['name', 'Year_Of_Joining'];

class HeaderComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            sortingParameter: 'name'
        };
    }

    searchEmployee = (event) => {
        this.setState({ searchString: event.target.value});
        this.props.onFilter(event.target.value);
    }

    sortData = (field) => {
        this.setState({ sortingParameter: field });
        this.props.onSort(field);
    }

    renderSearchBar = () => {
        return (
            <div className="col-sm-8">
                <input
                    type="text"
                    className="form-control"
                    placeholder="search by name"
                    onChange={(event) => this.searchEmployee(event)}
                    value={this.state.searchString}
                />
                <Image src={searchIcon} responsive={true} className="search-btn"/>
            </div>
        );
    }

    renderDropDown = () => {
        return (
            <div className="col-sm-4">
                <label className="label">Sort By</label>
                <DropdownButton
                    className="dropdown-btn"
                    title={this.state.sortingParameter}
                    id="bg-nested-dropdown"
                >
                {
                    map(sortingParams, (field, index) => {
                        return(
                            <MenuItem
                                key={index}
                                onClick={() => this.sortData(field)}
                            >{field}
                            </MenuItem>
                        )
                    })
                }
                </DropdownButton>
            </div>
        )
    }

    render() {
        return(
            <div className="grid-wrapper">
                <div className="row">
                    {this.renderSearchBar()}
                    {this.renderDropDown()}
                </div>
            </div>
        );
    }
}

export default HeaderComponent;