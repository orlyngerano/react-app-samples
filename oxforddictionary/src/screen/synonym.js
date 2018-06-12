import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Input,
  Button,
  List,
  Header
} from "semantic-ui-react";
import {REQUEST_SYNONYMS, REQUEST_SYNONYM_RESET} from '../actions/Word';
import AppLoader from '../components/AppLoader';


class Synonym extends Component {

  constructor(props) {
    super(props);
    this.state={
      searchWord: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    prevState.searchWord = nextProps.searchWord;
    return prevState;
  }

  render() {
    return (
      <Container>
        <AppLoader/>
        <Header as={"h1"}>Search Synonyms</Header>
        <div style={{display:'flex', marginTop: '10px' }}>
        <Input style={{ width: '100%'}} placeholder='Type a word' value={this.state.searchWord}  onChange={(event, data)=>{
          this.setState({searchWord: data.value});
        }} action={<Button icon='search' onClick={() => {
          this.props.search(this.state.searchWord);
        }} />} />
        <Button style={{marginLeft:'10px'}} size={'mini'} onClick={() => {
          this.props.reset();
        }}>
        RESET
        </Button>
        </div>  
        
        <List>
          { this.props.synonyms.map((item, index)=> (
            <List.Item key={index} style={{padding:'10px', borderBottom:'1px solid #aaa'}}>
            <List.Header as={'a'} onClick={()=>{
            this.props.history.push(`/word/${item.id}`);
          }}>{item.text}</List.Header>
          </List.Item>) )}
        </List>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    synonyms: state.Synonym.synonyms,
    searchWord: state.Synonym.searchWord
  }
}

const mapDispatchToProps = dispatch => {
  return {
    search: function (word) {
      dispatch({type: REQUEST_SYNONYMS, word: word});
    },
    reset: function () {
      dispatch({type: REQUEST_SYNONYM_RESET});
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Synonym);
