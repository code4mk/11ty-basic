module.exports = function(eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);
    // Copy these static files to _site folder
    eleventyConfig.addPassthroughCopy('assets')
};