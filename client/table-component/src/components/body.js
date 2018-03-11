import * as React from 'react';
import { Image, Button } from 'react-bootstrap';
import { map, keys } from 'lodash';
import '../styles/body.css';

class TableContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonArray: [],
            activePageIndex: 1,
            firstIndex: 0,
            lastIndex: 4,
        }
    }

    constructButtonArray = (numKeys) => {
        if(numKeys) {
            let numOfPages = numKeys % 5 ===  0 ? Math.floor(numKeys / 5) : Math.ceil(numKeys / 5);
            let buttonArray = [];
            while (numOfPages > 0) {
                buttonArray.unshift(numOfPages);
                numOfPages -= 1;
                if (numOfPages === 0) {
                    this.setState({ 
                        buttonArray,
                        activePageIndex: 1,
                        firstIndex: 0,
                        lastIndex:4 
                    });
                }
            }
        } else {
            this.setState({buttonArray: []});
        }
    }

    componentDidMount() {
        const numKeys = keys(this.props.data).length;
        this.constructButtonArray(numKeys);
    }

    componentWillReceiveProps(nextProps) {
        const numKeys = keys(nextProps.data).length;
        this.constructButtonArray(numKeys);
    }

    requestPage = (activePageIndex) => {
        const firstIndex = activePageIndex * 5 - 5;
        const lastIndex = activePageIndex * 5 - 1;
        this.setState({
            activePageIndex,
            firstIndex,
            lastIndex
        });
    }
    
    renderRow = (employeeInfo, key) => {
        return(
            <tr key={key}>
                <td className="text-center table-cell">
                    <Image className="img-accounts" src={employeeInfo.imageURL}/>
                </td>
                <td className="text-center table-cell">{employeeInfo.name}</td>
                <td className="text-center table-cell">{employeeInfo.designation}</td>
                <td className="text-center table-cell">{employeeInfo.Year_Of_Joining}</td>
                <td className="text-center table-cell">
                    <a href={employeeInfo.linkedIn}> {employeeInfo.linkedIn} </a>
                </td>
            </tr>
        );
    }

    renderFooter = () => {
        return (
            <div className="footer-wrapper">
                { map(this.state.buttonArray, (button, index) => {
                    return(
                        <Button 
                            className="pagination-btn"
                            key={index}
                            bsSize="md"
                            onClick={() => this.requestPage(button)}
                            style={{
                                backgroundColor: (index === (this.state.activePageIndex - 1))
                                ? 'white'
                                : '#dddddd'
                            }}
                        >{button}
                        </Button>
                    );
                })}
            </div>
        )
    }

    renderBody = () => {
        return(
            <table className="table table-striped custom-table">
                <thead>
                    <tr>
                        <th className="text-center">Profile-picture</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Designation</th>
                        <th className="text-center">Joining Year</th>
                        <th className="text-center">Linked-in URL</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        map(this.props.data, (data, index) => {
                            if ( index >= this.state.firstIndex && index <= this.state.lastIndex) {
                                return this.renderRow(data, index)
                            } else {
                                return null;
                            }
                        })
                    }
                </tbody>
            </table>
        );
    }
 
    render() {
        return(
            <div className="table-wrapper">
                {this.props.loading ?
                    <p className="text-center">loading info...</p>
                : keys(this.props.data).length ?
                    this.renderBody()
                : <p className="text-center">No data available</p>
                }
                {this.renderFooter()}
            </div>
        );
    }
}

export default TableContent;