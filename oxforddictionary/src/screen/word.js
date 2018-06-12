import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Container, 
  Header, 
  Statistic, 
  Divider, 
  List, 
  Grid, 
  Card, 
  Image, 
  Button, 
  Icon 
} from "semantic-ui-react";
import {REQUEST_DEFINITION} from '../actions/Word';
import AppLoader from '../components/AppLoader';

class Word extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.definition(this.props.match.params.id);
  }  

  render() {
    return (
      <Container>
        <AppLoader/>
        <Header as={'h1'} style={{marginTop:'10px'}}>{this.props.match.params.id}</Header>
        <div style={{padding:'10px'}}>
          {this.props.wordDefinitions.map((defintion, index)=>{
            return <div key={index}>{`(${index+1}) ${defintion}`}</div>;
          })}
        </div>
        <Button style={{marginTop:'10px'}} onClick={()=> this.props.history.push('/synonym') }>Go back</Button>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    wordDefinitions: state.Synonym.wordDefinitions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    definition: function (word) {
      dispatch({type: REQUEST_DEFINITION, word: word});
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Word);
