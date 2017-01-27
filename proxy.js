var system = require('system');

function urlPathSearchAndHash(url) {
    var parser = document.createElement('a');
    parser.href = url;
    return parser.pathname + parser.search + parser.hash;
}

var url = system.args[1];

if (system.args.length !== 2 || url[url.length - 1] === '/') {
  console.log('Usage: <url>');
  console.log('  url must NOT end with "/"')
  phantom.exit(1);
} else {
  var server = require('webserver').create();

  server.listen(8080, function (request, response) {
    console.log('-> Request ' + request.method + ' ' + request.url);

    if (request.method !== 'GET') {
      response.statusCode = 405;
      response.write('Only GET method supported');
      response.closeGracefully();
    } else {
      var pathSearchHash = urlPathSearchAndHash(request.url);
      var urlToRequest = url + pathSearchHash;

      var page = require('webpage').create();
      page.settings.loadImages = false;

      page.onResourceRequested = function(requestData, networkRequest) {
        console.log('->-> [' + requestData.time + '] Request (#' + requestData.id + ') ' + requestData.method + ' ' + requestData.url);
      };
      page.open(urlToRequest, function(status) {
        console.log(status);

        if (status === 'success') {
          response.statusCode = 200;
          response.setHeader('Connection', 'close');
          response.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
          response.write(page.content);
          console.log("<- Response " + request.method + ' ' + pathSearchHash);
        } else {
          response.statusCode = 500;
          response.write('Request Error');
        }

        response.closeGracefully();
        page.close();
      });
    }

  });
  console.log('Listening on 8080 ...');
}
