module.exports = function(eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);
    // Copy these static files to _site folder
    eleventyConfig.addPassthroughCopy('src/assets')
    return {
    dir: { 
        input: 'src', 
        output: '_site', 
        data: '_data' 
      },
   };
};