// # Content Helper
// Usage: `{{content}}`, `{{content words="20"}}`, `{{content characters="256"}}`
//
// Turns content html into a safestring so that the user doesn't have to
// escape it or tell handlebars to leave it alone with a triple-brace.
//
// Enables tag-safe truncation of content by characters or words.

var proxy = require('./proxy'),
    _ = require('lodash'),
    downsize = require('downsize'),
    SafeString = proxy.SafeString;

module.exports = function content(options) {
    // mp3 url regexp /(http://)?(www)?[-a-zA-Z0-9@:%_\+.~#?\/=]+\.mp3/ig

    // inject <div id="waveform"></div>

    // load mp3 wavesurfer.load('http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3');

    const regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    this.html = options.data.root.post.html.replace(
        regex,
        '<play>http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3</play>'
    );
    console.log(this.html);

    // create WaveSurfer object
    // const wavesurfer = WaveSurfer.create({
    //         container: '#waveform'
    //     });

    var truncateOptions = (options || {}).hash || {};
    truncateOptions = _.pick(truncateOptions, ['words', 'characters']);
    _.keys(truncateOptions).map(function (key) {
        truncateOptions[key] = parseInt(truncateOptions[key], 10);
    });

    if (
        truncateOptions.hasOwnProperty('words') ||
        truncateOptions.hasOwnProperty('characters')
    ) {
        return new SafeString(downsize(this.html, truncateOptions));
    }

    return new SafeString(this.html);
};
