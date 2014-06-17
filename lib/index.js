'use strict';

var logger  = require('simlog'),
    path    = require('path'),
    fs      = require('fs'),
    base    = __dirname,
    beep    = require('beep').Beep(),
    done    = path.join(base, '..', 'assets', 'done.mp3');


/**
 * Set the filename properly
 *
 * @method : setUnderscore
 * @param  : {String} str
 * @return : {String}
 * @api    : private
 */

function setUnderscore(str) {
    return str
        .toLowerCase()
        .replace(/\s+|\-+/g, '_');
}

/**
 * Set user path
 *
 * @method : setHomePath
 * @return : {String}
 * @api    : private
 */

function setHomePath() {
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

/**
 * Create Log for Tasks
 *
 * @method:     defineLog
 * @param:      {String} name
 * @param:      {String} time
 * @return:     {string|list}
 * @api:        public
 */

exports.defineLog = function(name, time) {

    var date     = new Date(),
        filename = setUnderscore(name),
        logdir   = path.join('.tictac'),
        logfile  = path.join(logdir, filename + '.txt'),
        logwrite = fs.createWriteStream(logfile);

    // Create Log File
    logwrite.on('finish', function() {
        console.log('');
        logger.done('Log file created sucessfully!');
        console.log('------------------------------------------');
    });

    logwrite.write('\n');
    logwrite.write('-----------------------------------------------\n');
    logwrite.write(' Task name: ' + name + '\n');
    logwrite.write(' Executed on: ' + date + '\n');
    logwrite.write(' Duration: ' + time + ' minutes\n');
    logwrite.write('-----------------------------------------------\n');
    logwrite.write('\n');

    logwrite.end();

};

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
        minute = (delay > 60000) ? 'minutes' : 'minute',
        logdir = path.join('.tictac');

    // Create log directory
    process.chdir(setHomePath());
    if(!fs.existsSync(logdir)) {
        fs.mkdirSync(logdir, function(err) {
            if(err) {
                logger.error('Can\'t make the directory!');
                logger.error(err);
            }
        });
    }

    // Start Task
    console.log('------------------------------------------');
    logger.info('Task: ' + name);
    logger.info('Time: ' + time + ' ' + minute);
    logger.done('Task is running!');

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
