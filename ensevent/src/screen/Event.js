import React, { Component } from 'react';
import {
  Label,
  Header,
  Button,
  Container,
  Segment,
  Dimmer,
  Loader,
  Divider,
  Icon
} from "semantic-ui-react";
import ethens, { ENS_CONTRACT_ADDRESS } from '../api/ethens';
import EventItem from '../components/EventItem'
import {COLOR_MAIN, COLOR_INFO} from '../themes/color';

class Event extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      showLoader: false,
      fromBlock: null,
      toBlock: null,
      blockRange: 1000
    };

    this.getBidRevelead = this.getBidRevelead.bind(this);
  }

  componentDidMount() {
    //this.getBidRevelead(5832848, 'latest');

    //this.getBidRevelead(5837031, 'latest');
    this.getBidRevelead();
  }


  getBidRevelead = async () => {

    let blockNumber = await ethens.getLatestBlockNumber();
    if (this.state.fromBlock == null) {
      let fromComputed = blockNumber - this.state.blockRange;
      fromComputed = fromComputed < 0 ? 0 : fromComputed;
      this.setState({ fromBlock: fromComputed, toBlock: 'latest' });
    }

    if (this.state.toBlock !== 'latest' && this.state.toBlock > blockNumber) {
      this.setState({ toBlock: 'latest' });
    }

    this.setState({ showLoader: true });
    try {
      let result = await ethens.getBidRevelead(this.state.fromBlock, this.state.toBlock);
      this.setState({
        events: result
      });
    } catch (e) {
      console.log(e);
    }
    this.setState({ showLoader: false });
  }

  sortEventsLatestBlock(data) {
    return data.sort(function (a, b) {
      return b.blockNumber - a.blockNumber;
    });
  }


  browseBlock = async (direction) => {
    if (direction == 'previous') {
      this.setState({
        fromBlock: this.state.fromBlock - this.state.blockRange,
        toBlock: this.state.fromBlock
      });
    } else if (direction == 'next' && this.state.toBlock != 'latest') {
      this.setState({
        fromBlock: this.state.toBlock,
        toBlock: this.state.toBlock + this.state.blockRange
      });
    }
    this.getBidRevelead();
  }

  render() {

    const events = this.sortEventsLatestBlock(this.state.events);

    let toBlock = this.state.toBlock;
    if (toBlock == 'latest' && events.length > 0) {
      toBlock = events[0].blockNumber;
    }

    return (<Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      {this.state.showLoader && <Dimmer active inverted>
        <Loader inverted content='Loading' />
      </Dimmer>}
      <Header size='huge' as={'span'}>BidRevealed Contract Events</Header>
      <Divider />
      <div>
        <b>Event Name: </b>
        BidRevealed(bytes32,address,uint256,uint8)
      </div>
      <div><b>Contract:</b> ENS-Registrar</div>
      <div><b>Address:</b> {ENS_CONTRACT_ADDRESS}</div>

      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ flex: 1}}>
          <Label circular color={COLOR_MAIN}>
            {this.state.events.length}
          </Label>
          &nbsp;
          Events found
          &nbsp;
          from block&nbsp;<b>{this.state.fromBlock}</b>&nbsp;to&nbsp;<b>{toBlock}</b>
          &nbsp;
          <Label basic color={COLOR_INFO}>
            Queried in 1000 Block Range
          </Label>
        </div>
        <div>
          <Button.Group color={COLOR_MAIN} size={'mini'} floated={'right'}>
            <Button onClick={() => this.browseBlock('previous')}>
              <Icon name='left arrow' />
              PREVIOUS</Button>
            <Button onClick={() => this.browseBlock('next')}>NEXT
        <Icon name='right arrow' />
            </Button>
          </Button.Group>
        </div>
      </div>

      <Segment.Group>
        {events.map(function (item) {
          return <EventItem key={item.blockHash} data={item} />;
        })}
      </Segment.Group>
    </Container>);
  }
}


export default Event;
