'use strict';

var logger  = require('simlog'),
    path    = require('path'),
    base    = __dirname,
    beep    = require('beep').Beep(),
    done    = path.join(base, '..', 'assets', 'done.mp3');

/**
 * Define Task
 *
 * @method:     defineTask
 * @param:      {String} name
 * @param:      {String} time
 * @return:     {String}
 * @api:        public
 */

exports.defineTask = function(name, time) {

    var delay  = time * 60 * 1000,
        minute = (delay > 60000) ? 'minutes' : 'minute';

    // Start Task
    console.log('------------------------------------------');
    logger.info('Task: ' + name);
    logger.info('Time: ' + time + ' ' + minute);
    logger.done('Task is running!');
    console.log('------------------------------------------');

    // Stop Task
    setTimeout(function() {

        console.log('');
        console.log('------------------------------------------');
        logger.warn('Stopping previous task!');
        logger.info('Task name was: ' + name);
        logger.info('Time was set to: ' + time + ' ' + minute);
        console.log('------------------------------------------');

        beep.sound(done);
        process.exit(0);

    }, delay);

};
