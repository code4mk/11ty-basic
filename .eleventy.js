const fs = require("fs");

module.exports = function(eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);
    // Copy these static files to _site folder
    eleventyConfig.addPassthroughCopy('src/assets');

  //   eleventyConfig.setBrowserSyncConfig({
  //     middleware: [
  //         function (req, res, next) {
  //             if (/^[^.]+$/.test(req.url)) {
  //                 res.setHeader('Content-Type', 'text/html; charset=utf-8');
  //             }
  //             console.log("yo")
  //             next();
  //         }
  //     ]
  // });

  const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
    
    eleventyConfig.setBrowserSyncConfig({
      middleware: [
                function (req, res, next) {
                  let validatorRegex = /.html$/
                  if(validatorRegex.exec(req.url) == null) {
                    try {
                      const content = fs.readFileSync('_site'+req.url.substring(0, req.url.length - 1)+'.html');
                      res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
                      res.write(content);
                      res.end();
                    } catch (error) {
                      let content
                      if(req.url == '/'){
                         content = fs.readFileSync('_site/index.html');
                      }else{
                         content = fs.readFileSync('_site/404.html');
                      }
                      res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
      
                      res.write(content);
                      res.end();
                    }
                  }else{
                    res.writeHead(302, {
                      'Location': req.url.substring(0, req.url.length - 5)
                    });
                    res.end();
                    next()
                  }   
                }
            ],
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