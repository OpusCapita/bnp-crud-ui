const retry = require('bluebird-retry');

module.exports.up = function(db)
{
    const callback = (resolve, reject) =>
    {
        db.queryInterface.bulkInsert('Permission', [{
            "authorityId": "admin",
            "tenantId": "",
            "resourceGroupId": "bnp-crud-ui/*"
        }])
        .then(resolve)
        .catch(reject);
    }

    return retry(callback, { max_tries: 20, interval: 2000 });
}

module.exports.down = function(db)
{
    const callback = (resolve, reject) =>
    {
        db.queryInterface.bulkDelete('Permission', [{
            "authorityId": "admin",
            "resourceGroupId": "bnp-crud-ui/*"
        }])
        .then(resolve)
        .catch(reject);
    }

    return retry(callback, { max_tries: 20, interval: 2000 });
}