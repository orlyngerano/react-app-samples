import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
    Loader,
    Dimmer } from "semantic-ui-react";


class AppLoader extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
            { this.props.actionProgress && <div style={{display: 'flex:', width: '100%', height: '100%', position: 'fixed' , zIndex: 9999, top: '0px', left: '0px'}}>
                        <Dimmer active inverted>
                            <Loader inverted content='Please wait...' />
                        </Dimmer>
        </div> }
            </div>

        );
    }
}


const mapStateToProps = state => {
    let actionProgress = state.Main.actionProgress;
    return {
        actionProgress: actionProgress
    }
}


export default connect(mapStateToProps, null)(AppLoader);