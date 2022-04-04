const cluster = require('cluster')
const express = require('express')
const numCPUs = require('os').cpus().length


const PORT = process.argv[2] || 8080 
const MODE = process.argv[3] || 'CLUSTER'
const app = express()


if( MODE && MODE =='CLUSTER' && cluster.IsMaster){
    console.log(`Master ${process.pid} is running on ${PORT}`);

    for(let i = 0; i < numCPUs; i++){
        cluster.fork()
    }
    cluster.on('exit', (worker,code,signal) =>{
        console.log(`Worker ${worker.process.pid} died :( `)
    })

}else{


    app.get('/api/random', (req, res) =>{
        console.log(`Get randoms [${process.pid}] ${ new Date()}`)
        res.send('Random') // cluster
    })
    
    app.get('/api/setting', (req, res) =>{
        console.log(`Get setting [${process.pid}]`)
        res.send('setting') // fork
    })

    console.log(`Worker ${process.pid} started`)
    app.listen(PORT, () => console.log(`Listening on port ${PORT} [${MODE}]`))

}