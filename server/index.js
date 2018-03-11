const http = require('http')
const port = 1337
const fs = require('fs');
const cors = require('cors')({ origin: true });
const bodyParser = require('body-parser')
const helpers = require('./utils');
const _ = require('lodash');

const requestHandler = (request, response) => {
    cors(request, response, () => {
        request.on('data', function(chunk){
            const payload = JSON.parse(chunk);
            console.log('Request payload', payload);
            if(_.keys(payload).length){
                let resultObj = {};
                if(payload.filter){
                    resultObj = helpers.filter(payload.query);
                } else if(payload.limit){
                    resultObj = helpers.paginate(payload.limit, payload.offset);
                } else if(payload.sort){
                    resultObj = helpers.sort(payload.sortBy);
                }
                response.end(JSON.stringify(resultObj));
            } else {
                const data = fs.readFileSync(__dirname + '/employees.json')
                response.end(data);
            }
        })
    });
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})