
import Web3 from 'web3';

window.web3 = new Web3(window.web3.currentProvider);
//window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
export const ENS_CONTRACT_ADDRESS = '0x6090A6e47849629b7245Dfa1Ca21D94cd15878Ef';


const ethens = {
    getBidRevelead: (fromBlock, toBlock) => {
        return new Promise((resolve, reject) => {
            window.web3.eth.filter({
                address: ENS_CONTRACT_ADDRESS,
                fromBlock: fromBlock,
                toBlock: toBlock,
                'topics': [
                    window.web3.sha3('BidRevealed(bytes32,address,uint256,uint8)')
                ]
            }).get(function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    },
    getLatestBlockNumber: function () {
        return new Promise((resolve, reject) => {
            window.web3.eth.getBlockNumber(function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    },
    getTransaction: function(transactionHash){
        return new Promise((resolve, reject) => {
            window.web3.eth.getTransaction(transactionHash, function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });                       
    },
    getBlock: function(blockHash){
        
        return new Promise((resolve, reject) => {
            window.web3.eth.getBlock(blockHash, function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });                       
    }


};

export default ethens;