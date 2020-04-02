import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CharacterDelete from './CharacterDelete';

class Character extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.seq}</TableCell>
                <TableCell><img src={this.props.image} className="profile" alt="ProfileImage" /></TableCell>
                <TableCell>{this.props.cName}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.role}</TableCell>
                <TableCell>{this.props.releaseTitle}</TableCell>
                <TableCell>{this.props.releaseDate}</TableCell>
                <TableCell>{this.props.createdDatetime}</TableCell>
                <TableCell>{this.props.isDeleted}</TableCell>
                <TableCell><CharacterDelete stateRefresh={this.props.stateRefresh} id={this.props.seq} /></TableCell>
            </TableRow>
        )
    }
}

export default Character;
