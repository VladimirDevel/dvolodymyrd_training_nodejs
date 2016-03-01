// Module logger.js
function getDate() {
    return new Date().toISOString();
}

module.exports = {
    info: function(message) {
        //console.log(getDate(), '[' + "info" + ']', message);
        null
    },
    stats: function(message) {
        console.log(getDate(), '[' + "stats" + ']', message);
        null
    },
    error: function(message) {
        console.log(getDate(), '[' + "error" + ']', message);
        null
    }

};

module.exports.level = 'info';
module.exports.getDate = getDate;