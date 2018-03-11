const fs = require('fs');
const _ = require('lodash');

getData = () => {
    return JSON.parse(fs.readFileSync(__dirname + '/employees.json'));
}

exports.filter = (query) => {
    let results = {};
    let count = 0;
    if(query) {
        snakeCaseQuery = _.snakeCase(query);
        _.each(getData(), (empInfo, index) => {
            const name = _.snakeCase(empInfo.name)
            if(_.indexOf(_.words(name), query) !== -1){
                _.assign(results, {[count]: empInfo});
                count++;
            }
        });
    } else {
        _.each(getData(), (empInfo, index) => {
            _.assign(results, {[index]: empInfo});
        });
    }
    return results;
}

exports.paginate = (limit = 10, offset = 0) => {
    let results = {};
    const startAt = limit * offset;
    const endAt = limit + startAt;
    _.each(getData(), (empInfo, index) => {
        if(index >= startAt && index <endAt){
            _.assign(results, {[index]: empInfo});
        }
    });
    return results;
}

exports.sort = (parameter) => {
    const results = _.orderBy(getData(), parameter);
    return results;
}