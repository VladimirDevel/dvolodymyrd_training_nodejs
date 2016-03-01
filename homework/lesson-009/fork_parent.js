var cp = require('child_process');
var child = cp.fork('./fork_child');
child.on('message', function(m) {
    console.log('Factorial is: ' + m);
});
child.send(10);