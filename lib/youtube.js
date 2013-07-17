var request = require('./request')
  , Youtube = exports;

/**
 * Get a user's latest media.
 *
 * Example:
 *   Youtube.latestMedia('TMZ', function (err, media) {
 *       console.log(media);
 *   });
 *
 * Result:
 *   [ { id: 'GGZkYplVBOs',
 *       date: Wed Jul 17 2013 11:00:12 GMT+1000 (EST),
 *       title: 'Foobar',
 *       link: 'http://www.youtube.com/watch?v=GGZkYplVBOs',
 *       thumbnail: 'http://img.youtube.com/vi/GGZkYplVBOs/maxresdefault.jpg' }
 *   , { id: 'fu8wNDa067g',
 *       date: Wed Jul 17 2013 09:29:35 GMT+1000 (EST),
 *       title: 'Foobaz',
 *       link: 'http://www.youtube.com/watch?v=fu8wNDa067g',
 *       thumbnail: 'http://img.youtube.com/vi/fu8wNDa067g/maxresdefault.jpg' }
 *   , ... ]
 *
 * @param {String} username
 * @param {Function} callback
 */

Youtube.latestMedia = function (username, callback) {
    var url = 'http://gdata.youtube.com/feeds/api/users/' +
        encodeURIComponent(username) + '/uploads?v=2&alt=jsonc';
    request.json(url, function (err, body) {
        try {
            callback(null, body.data.items.map(function (item) {
                return {
                    id: item.id
                  , date: new Date(item.uploaded)
                  , title: item.title
                  , link: 'http://www.youtube.com/watch?v=' + item.id
                  , thumbnail: 'http://img.youtube.com/vi/' + item.id + '/maxresdefault.jpg'
                };
            }));
        } catch (e) {
            callback(new Error('Invalid response'));
        }
    });
};
