var Hook = require('hook.io').Hook,
    util = require('util');


var SitewatcherHook = exports.SitewatcherHook = function(options) {

  var self = this;
  
  Hook.call(self, options);
  
  self.on('hook::ready', function() {
    // When the hook is ready, spawn up a couple of children
    self.spawn(['request'], function(err){
      if(err){
        throw err
      }
    });
  
  });

  self.on('children::ready', function(){
    self._start();
  });
  
  self.on('*::gotResponse', function(data){
    var self = this;

    if(data.statusCode === 200) {
      //
      // We've gotten a response, no error have occured and the server has 
      // not return with a 304 Not modified. We're assuming that the site have
      // changed.
      //
      var sites = self.config.get('sites')
      var now = (new Date()).toUTCString();

      sites.forEach(function(site){
        if (site.name === data.hook.name) {
          //
          // Setting "If-Modified-Since" should make the server responde with a
          // Not Modified 302 status code and no body until the site changes.
          //
          site.headers["If-Modified-Since"] = now;
          
          self.emit('siteChanged', data);
        }
      });
      self.config.save();
    }
  });
}

// SitewatcherHook inherits from Hook
util.inherits(SitewatcherHook, Hook);

SitewatcherHook.prototype._start = function() {

  var self = this;

  var sites = self.config.get('sites');
  if(sites) {
    sites.forEach(function(site){
      site.headers = site.headers || {};
      //
      // Delete "If-Modified-Since" so that a site is always assumed to be
      // changed on startup
      //
      delete site.headers["If-Modified-Since"];

      // Can't use cron now, as removeJob/updateJob isn't implemented and
      // site.headers needs to be updated every time a site has changed.
      
      setInterval(function(){
        self.emit('sendRequest', site);
        
      }, 5 *  1000)
/*      self.emit('addJob', {
          "event": "sendRequest",
          "data": site,
          "every": "5 minutes",
          "name": site.name
        }); */
    });
  }
  self.config.save();
}
