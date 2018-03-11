import * as React from 'react';
import HeaderComponent from '../components/header'
import TableContent from '../components/body'
import apiRequest from '../utils'
import { each, snakeCase, orderBy } from 'lodash'
import '../styles/dataTable.css';

class DataTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            filteredData: {},
            loading: false,
            filtered: false
        };
    }

    componentDidMount = async () => {
        try {
            this.setState({ loading: true});
            const body = JSON.stringify({
                sort: true,
                sortBy: 'name'
            });
            const responseJson = await apiRequest(body);
            this.setState({ data: responseJson , loading: false})
        } catch (error) {
            this.setState({ error: true , loading: false})
        }
    }

    onFilter = (query) => {
        const snakecaseQuery = snakeCase(query);
        this.setState({ loading: true, sorted: false })
        let filteredArray = [];
        if (query !== '' && this.state.data.length !== 0) {
            each(this.state.data, (data, key) => {
                const snakecaseName = snakeCase(data.name);
                if (RegExp(snakecaseQuery).test(snakecaseName)) {
                    filteredArray.push(data);
                }
            });
            this.setState({ filteredData: filteredArray, filtered: true, loading: false});
        } else {
            this.setState({ loading: false, filtered: false });
        }
    }

    onSort = async (sortBy) => {
        try{
            this.setState({ loading: true});
            if(this.state.filtered && this.state.filteredData.length) {
                const sorted = orderBy(this.state.filteredData, sortBy);
                this.setState({ filteredData: sorted, filtered: true, loading: false})
            } else {
                const body = JSON.stringify({
                    sort: true,
                    sortBy
                });
                const responseJson = await apiRequest(body);
                this.setState({ data: responseJson , loading: false, sorted: true})
            }
        } catch (error) {
            this.setState({ error: true , loading: false})
        }
    }

    render() {
        return(
            <div className="wrapper">
                <div className="text-center">
                    <h1 className="heading">The Hubbler Team</h1>
                </div>
                <div className="header-componet-wrapper">
                    <HeaderComponent
                        onFilter={this.onFilter}
                        onSort={this.onSort}
                    />
                </div>
                <TableContent
                    data={this.state.filtered ? this.state.filteredData: this.state.data}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}

export default DataTable;