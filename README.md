Facebook-Blendata
=========

A small api for making requests to Facebook's Graph API. In house package.

## Installation

  npm install facebook-blendata --save

## Usage

  ```
  import { FacebookApi } from 'facebook-blendata';

  const apiKey = '1234';
  const domain = 'www.yourDomain.com';
  const privateKey = 'abc';

  // initialize gravityForms instance
  const gravityForms = new GravityFormsAPI(apiKey, domain, privateKey);

  const method = 'GET';
  const route = 'forms/1/entries';

  // Create a signature for the route you want to interact with
  const signature = gravityForms.createSignature(method, route);

  // Make the api request
  const results = gravityForms.request(route, signature);
  ```

## Release History

* 0.0.1 Initial release
