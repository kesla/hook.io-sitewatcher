## hook.io-sitewatcher

*a Hook for monitoring when sites changes.*

## Installation

     npm install hook.io-pinger -g

## Usage

     hookio-pinger

## Hook Events Names

**siteChanged** *event emitted when a site has changed*

## Hook config.json settings
``` js

{ 
  "sites": [
   {
     "name": "Google",
     "url": "http://google.com/"
   },
   {
     "name": "Github",
     "url": "http://www.github.com/"
   }
  ]
}

```

## Required Hooks

  - [cron](http://github.com/hookio/cron)
  - [request](http://github.com/hookio/request)
