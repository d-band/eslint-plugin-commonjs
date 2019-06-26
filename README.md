eslint-plugin-commonjs
======================

[![NPM version](https://img.shields.io/npm/v/eslint-plugin-commonjs.svg)](https://www.npmjs.com/package/eslint-plugin-commonjs)
[![NPM downloads](https://img.shields.io/npm/dm/eslint-plugin-commonjs.svg)](https://www.npmjs.com/package/eslint-plugin-commonjs)
[![Build Status](https://travis-ci.org/d-band/eslint-plugin-commonjs.svg?branch=master)](https://travis-ci.org/d-band/eslint-plugin-commonjs)
[![Coverage Status](https://coveralls.io/repos/github/d-band/eslint-plugin-commonjs/badge.svg?branch=master)](https://coveralls.io/github/d-band/eslint-plugin-commonjs?branch=master)
[![Dependency Status](https://david-dm.org/d-band/eslint-plugin-commonjs.svg)](https://david-dm.org/d-band/eslint-plugin-commonjs)
[![Greenkeeper badge](https://badges.greenkeeper.io/d-band/eslint-plugin-commonjs.svg)](https://greenkeeper.io/)

## Install

```bash
$ npm install --save-dev eslint eslint-plugin-commonjs
```

## Usage

All rules are off by default. However, you may configure them manually in your .eslintrc.(yml|json|js).

```yaml
env:
  node: true

plugins:
  - commonjs

rules:
  commonjs/no-duplicate-exports: 2
```
