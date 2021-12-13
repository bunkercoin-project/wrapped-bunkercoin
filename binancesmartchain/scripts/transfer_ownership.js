// Right click on the script name and hit "Run" to execute
(async () => {

        //address of deployed contract
        const contractAddress = '0xf8e81D47203A594245E36C48e151709F0C19fBe8'
        //address of the new owner
        const multisigAddress = '0xA7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B'
        
        const contractName = 'WBKC' // Change this for other contract

        console.log('get contract')

        const artifactsPath = `browser/contracts/artifacts/${contractName}.json` 
        const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))

        //provider accounts
        const accounts = await web3.eth.getAccounts()
        let contract = new web3.eth.Contract(metadata.abi, contractAddress)

        console.log('Start ownership transfer...')

        contract.methods.transferOwnership(multisigAddress).send({ from: accounts[0],
                                                                    gas: 40000,   //adjust fee and price 40kgas should be enough
                                                                    gassfee: '30'}).on('receipt', async (receipt) => {
              //print transactions when they are included in block
                console.log(receipt)
            })
        

        console.log('end ownership transfer')


})()
