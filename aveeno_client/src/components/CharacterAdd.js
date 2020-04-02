import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

class CharacterAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            cName: '',
            gender: '',
            role: '',
            releaseTitle: '',
            releaseDate: '',
            open: false
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCharacter()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            });
        this.setState({
            image: '',
            cName: '',
            gender: '',
            role: '',
            releaseTitle: '',
            releaseDate: '',
            open: false
        });
        // window.location.reload();
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCharacter = () => {
        const url = '/api/characters';
        const payload = {
            'image': this.state.image,
            'cName': this.state.cName,
            'gender': this.state.gender,
            'role': this.state.role,
            'releaseTitle': this.state.releaseTitle,
            'releaseDate': this.state.releaseDate
        };
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
       
        return post(url, payload, config);
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            image: '',
            cName: '',
            gender: '',
            role: '',
            releaseTitle: '',
            releaseDate: '',
            open: false
        })
    }

    render() {
        return (
            <div>
                <Button variant='contained' color='primary' onClick={this.handleClickOpen}>
                    추가
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>추가</DialogTitle>
                    <DialogContent>
                        <TextField label="이미지링크" type="text" name="image" 
                            value={this.state.image}
                            onChange={this.handleValueChange} /><br/>
                        <TextField label="이름" type="text" name="cName" 
                            value={this.state.cName}
                            onChange={this.handleValueChange} /><br/>
                        <TextField label="성별" type="text" name="gender" 
                            value={this.state.gender}
                            onChange={this.handleValueChange} /><br/>
                        <TextField label="역할" type="text" name="role"
                            value={this.state.role}
                            onChange={this.handleValueChange} /><br/>
                        <TextField label="작품명" type="text" name="releaseTitle" 
                            value={this.state.releaseTitle}
                            onChange={this.handleValueChange} /><br/>                        
                        <TextField label="등장일" type="text" name="releaseDate" 
                            value={this.state.releaseDate}
                            onChange={this.handleValueChange} /><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CharacterAdd);
