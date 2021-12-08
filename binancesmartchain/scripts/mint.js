// Right click on the script name and hit "Run" to execute
// mint tokens to
/*
*	Change contract address
*	Setup accepted range of addresses and amounts
*	Tune gas cost and price
*/

(async () => {

        //address of deployed contract
        const contractAddress = '0xf8e81D47203A594245E36C48e151709F0C19fBe8'

        const contractName = 'WBKC' // Change this for other contract

        const pays = {'0x5B38Da6a701c568545dCfcB03FcB875f56beddC4': '51030000', // 51 millions 30 thousands
                      '0xf8e81D47203A594245E36C48e151709F0C19fBe8': '23400000'  // 23 millions 400 thousands
                        }

        console.log('get contract')

        const artifactsPath = `browser/contracts/artifacts/${contractName}.json` 
        const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))

        //provider accounts
        const accounts = await web3.eth.getAccounts()
        let contract = new web3.eth.Contract(metadata.abi, contractAddress)

        console.log('start minting sequence...')
		
		//mint tokens for each buyer in list
        for (var buyerAddress in pays) {
			
			//conversion to wei
            const buyerAmount = web3.utils.toWei(pays[buyerAddress])
			
            console.log(buyerAddress)
            console.log(buyerAmount)
			
			//call contract to mint
            contract.methods.mint(buyerAddress, buyerAmount).send({ from: accounts[0],
                                                                    gas: 40000, //adjust fee and price
                                                                    gassfee: '30'}).on('receipt', async (receipt) => {
																		
				//print transactions when they are included in block
                console.log(receipt)
            })
        }

        console.log('end minting sequence')


})()