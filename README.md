# kap-vercel ![Node.js CI](https://github.com/delianides/kap-vercel/workflows/Node.js%20CI/badge.svg?branch=master) [![npm](https://img.shields.io/npm/dt/kap-vercel.svg)](https://www.npmjs.com/package/kap-vercel)

<p align="center">
  <img width="300" height="109" src="vercel.png">
</p>

> [Kap](https://github.com/wulkano/kap) plugin - Share on [Vercel](https://vercel.com)

This plugin utilizes Vercel's preview deployments feature. When you export a recording to Vercel the preview URL is copied to the clipboard and can be shared publically.

![image](https://user-images.githubusercontent.com/1020551/127328782-1c095e6a-dac5-443e-a539-bbecc1721a0e.png)

## Install

In the `Kap` menu, go to `Preferences…`, select the `Plugins` pane, find this plugin, and click `Install`.

You should also add your [Vercel token](https://vercel.com/account/tokens) to the plugin configuration.
In the `Plugins` pane, click `Open plugins folder`, edit the `kap-vercel.json` file to add a `token` property with your token value.

## Usage

In the editor, after recording, select one of the export formats, and then `Share on Vercel`.

![image](https://user-images.githubusercontent.com/1020551/127329088-408ff31d-36a3-498d-a996-19f0c26e3822.png)

## License

See LICENSE
