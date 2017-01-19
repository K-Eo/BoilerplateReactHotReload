var os = require('os');
var ifaces = os.networkInterfaces();

var getDefaultIP = function() {

  var ifacesKeys = Object.keys(ifaces);
  var ip = '';

  for (var i = 0; i < ifacesKeys.length; i++) {

    var iface = ifaces[ifacesKeys[i]];

    var alias = 0;

    for (var j = 0; j < iface.length; j++) {

      var currentiface = iface[j];
      if ('IPv4' !== currentiface.family || currentiface.internal !== false) {

        // Skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses

        continue;

      }

      if (alias >= 1) {

        // More than one alias then return localhost

        ip = 'localhost';

      } else {

        // Return local ip v4 address

        ip = currentiface.address;

      }

      ++alias;

    }
  }

  return ip;
};


exports.getDefaultIP = getDefaultIP;
