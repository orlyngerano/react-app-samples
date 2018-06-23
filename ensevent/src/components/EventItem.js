import React, { Component } from 'react';
import {
    Header,
    Button,
    Segment,
    List,
    Dropdown
} from "semantic-ui-react";
import ethens from '../api/ethens';
import moment from 'moment';
import { COLOR_HIGHLIGHT, COLOR_MAIN } from '../themes/color';

const CellCom = (props) => {
    return (<div style={{ display: 'flex', borderBottom: '1px solid #eee' }}>
        <div style={{ width: '30%', wordWrap: 'break-word', fontWeight: 'bold' }}>{props.label}</div>
        <div style={{ width: '70%', wordWrap: 'break-word' }}>{props.value}</div>
    </div>);
}


class EventItem extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isMouseOver: false,
            dataChunks: this.transformDataToChunksWithFmtTypes(props.data.data),
            more: false,
            block: null,
            moreLoading: false,
            transaction: null
        };

        this.options = [
            { text: 'Hex', value: 'Hex' },
            { text: 'Text', value: 'Text' },
            { text: 'Decimal', value: 'Decimal' },
        ];
    }

    transformDataToChunksWithFmtTypes(hexString) {
        const uFmtString = hexString.replace(/^0x+/, '');
        const chunks = uFmtString.match(/.{1,64}/g);
        return chunks.map(function (chunk) {
            return { data: chunk, type: 'Hex' } //default to hex
        });
    }

    tranformDataToType(data, type) {
        if (type == 'Text') {
            return window.web3.toAscii(data);
        } else if (type == 'Decimal') {
            return window.web3.toDecimal(data);
        } else {
            return data;
        }
    }

    getMore = async (blockHash, transactionHash) => {
        if (this.state.block != null && this.state.transaction != null) {
            this.setState({ more: true });
        } else {
            this.setState({ moreLoading: true });
            try {
                const block = await ethens.getBlock(blockHash);
                this.setState({ block: block, more: true });
            } catch (e) { console.log(e); }


            try {
                let transaction = await ethens.getTransaction(transactionHash);
                transaction['inputType'] = 'Hex';

                this.setState({ transaction: transaction, more: true });
            } catch (e) { console.log(e); }

            this.setState({ moreLoading: false });
        }
    }

    createTopicList = (topics) => {
        return topics.map(function (topic, topicIndex) {
            return (<div key={topicIndex}>{`[Topic${topicIndex}] ${topic}`}</div>);
        });
    }

    createDataListComp = () => {
        return this.state.dataChunks.map((chunk, dataIndex) => {
            return (<div>
                <Dropdown inline options={this.options} defaultValue={chunk.type} onChange={(e, d) => {
                    let dataChunks = this.state.dataChunks;
                    dataChunks[dataIndex].type = d.value;
                    this.setState(dataChunks);
                }} />
                {this.tranformDataToType('0x' + chunk.data, chunk.type)}
            </div>);
        });
    }

    createInputComp = () => {
        return (this.state.transaction && <div>
            <Dropdown inline options={this.options} defaultValue={this.state.transaction.inputType} onChange={(e, d) => {
                let transaction = this.state.transaction;
                transaction.inputType = d.value;
                this.setState({ transaction });
            }} />
            {this.tranformDataToType(this.state.transaction.input, this.state.transaction.inputType)}
        </div>);
    }

    render() {
        const { blockHash, blockNumber, topics, transactionHash } = this.props.data;

        let comStyle = {};
        if (this.state.isMouseOver) {
            comStyle = { backgroundColor: COLOR_HIGHLIGHT };
        }

        return (<Segment color={COLOR_MAIN} style={comStyle} onMouseOut={() => this.setState({ isMouseOver: false })} onMouseOver={() => this.setState({ isMouseOver: true })}>
            <CellCom label={'data:'} value={this.createDataListComp()} />
            <CellCom label={'topics:'} value={this.createTopicList(topics)} />
            <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <Button loading={this.state.moreLoading} basic color={COLOR_MAIN} size={'mini'} floated={'right'} onClick={() => {
                    if (this.state.more) {
                        this.setState({ more: false });
                    } else {
                        this.getMore(blockHash, transactionHash);
                    }
                }}> {this.state.more ? 'Hide' : 'Show Block and Transaction'}
                </Button></div>
            <div style={{ clear: 'both' }} />
            {this.state.more && (<div style={{ display: 'flex', borderTop: '1px solid #ddd', marginTop: '10px', paddingTop: '10px' }}>
                {this.state.block && (<div style={{ width: '50%', paddingRight: '10px' }}>
                    <Header>Block</Header>
                    <CellCom label={'blockHash:'} value={blockHash} />
                    <CellCom label={'blockNumber'} value={blockNumber} />
                    <CellCom label={'gasLimit:'} value={this.state.block.gasLimit} />
                    <CellCom label={'gasUsed:'} value={this.state.block.gasUsed} />
                    <CellCom label={'timestamp:'} value={moment(this.state.block.timestamp * 1000).format("DD MMM YYYY HH:mm:ss")} />
                    <CellCom label={'miner:'} value={this.state.block.miner} />
                    <CellCom label={'extraData:'} value={window.web3.toAscii(this.state.block.extraData)} />
                </div>)}
                {this.state.transaction && (<div style={{ width: '50%', paddingLeft: '10px' }}>
                    <Header>Transaction</Header>
                    <CellCom label={'transactionHash:'} value={transactionHash} />
                    <CellCom label={'gas:'} value={this.state.transaction.gas} />
                    <CellCom label={'gasPrice:'} value={this.state.transaction.gasPrice.toString()} />
                    <CellCom label={'value:'} value={this.state.transaction.value.toString()} />
                    <CellCom label={'from:'} value={this.state.transaction.from} />
                    <CellCom label={'to:'} value={this.state.transaction.to} />
                    <CellCom label={'input:'} value={this.createInputComp()} />
                </div>)}
            </div>)}
        </Segment>);
    }
}

export default EventItem;