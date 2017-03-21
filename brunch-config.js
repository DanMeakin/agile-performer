// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/,
      'app.js': /^app/
    }
  },
  stylesheets: {joinTo: 'app.css'}
};

exports.plugins = {
  babel: {
    presets: ['latest', 'react']
  },

  sass: {
    mode: 'ruby' // set to 'native' to force libsass
  }
};
