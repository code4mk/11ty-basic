const fs = require("fs");

module.exports = function(eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);
    // Copy these static files to _site folder
    eleventyConfig.addPassthroughCopy('src/assets');
    
    eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('_site/404.html');
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });
    return {
    dir: { 
        input: 'src', 
        output: '_site', 
        data: '_data' 
      },
   };
};