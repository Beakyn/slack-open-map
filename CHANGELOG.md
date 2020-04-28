# Changelog

This project adheres to [Semantic Versioning](http://semver.org/).

## v1.6.1 (2020-04-21)

### Refactor & Improvements ✨

- Bump https-proxy-agent from 2.2.2 to 2.2.4 #34

## v1.6.0 (2020-03-04)

### Features 🎉

- Add support for role "dmp:guest" #29

### Refactor & Improvements ✨

- Move /functions and /utils to /src b5793c1c5da22a99d4bad23c40138fbe476d8666
- Replace tslint for eslint
- Fix husky warnings #30

## v1.5.1 (2020-01-06)

### Refactor & Improvements ✨

- Bump handlebars from 4.1.2 to 4.5.3 (#1)
- Bump node version to v12

## v1.5.0 (2019-10-04)

### Refactor & Improvements ✨

- Allow save limit in collection #25
- Remove panelsIds field from collection #22
- Remove panelCount field from collection #18
- Batch update/create collections with Panels #19

## v1.4.3 (2019-09-03)

### Bug Fixes 🐛

- Fix Elasticsearch script update by removing the last semicolon

## v1.4.2 (2019-08-29)

### Bug Fixes 🐛

- Allow creating a collection with description
- If the collection user has roles `GUEST` or `EDITOR` return user #17

## v1.4.1 (2019-08-26)

### Bug Fixes 🐛

- Avoid process mustNot if don't have on Add Panel #15

## v1.4.0 (2019-08-26)

### Refactor & Improvements ✨

- Update panelsIds on add/remove operations #12

### Bug Fixes 🐛

- Fix support for `script` on update bf4a882c72ab96df564d139a89e7d135ed630e27

## v1.3.0 (2019-08-07)

### Features 🎉

- Implement aggregation end point #5
- If a MAD API v3 filter is passed sync with panelIds #8

### Refactor & Improvements ✨

- Improve code climate score #7
- Refactor the collection create payload #6

## v1.2.0 (2019-06-06)

### Refactor & Improvements ✨

- Allow editors to update name and description a6cd8de294e8ea84c73819b5ec3f46494d1a2aaf

### Bug Fixes 🐛

- Fix limit property on collection search

## v1.1.0 (2019-05-31)

### Refactor & Improvements ✨

- Remove handler.js dependency
- Enable XRay tracing
- Enable CloudWatch logs group
- Add husky tasks #1

## v1.0.0 (2019-02-08)

> First Release! 🎂 🤘

### Features 🎉

- Implement Collection endpoints
