## hook.io-sitewatcher

*a Hook for monitoring when sites changes.*

## Inspiration

A lot of inspiration to this hook comes from [pinger](https://github.com/hookio/pinger)

## Installation

     npm install hook.io-sitewatcher -g

## Usage

     hookio-sitewatcher

## Hook Events Names

**siteChanged** *event emitted when a site has changed.*

## Hook config.json settings

``` js

{
  "sites": [
    {
      "name": "Node blog",
      "url": "http://blog.nodejs.org/"
    }
  ]
}

```

## Required Hooks

  - [request](http://github.com/hookio/request)
