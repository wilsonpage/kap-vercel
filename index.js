"use strict";
const { createHash } = require("crypto");
const through2 = require("through2");
const { readFile } = require("fs-extra");
const ejs = require("ejs");

const action = async context => {
	const uploadEndpoint = "https://api.vercel.com/v2/now/files";
	const deploymentEndpoint = "https://api.vercel.com/v12/now/deployments";
	const Authorization = "Bearer " + context.config.get("token");

	const filePath = await context.filePath();
	const data = await readFile(filePath);
	const sha = createHash("sha1")
		.update(data)
		.digest("hex");
	const stream = through2();
	stream.write(data);
	stream.end();

	context.setProgress("Uploading…");
	await context.request(uploadEndpoint, {
		headers: {
			"Content-Type": "application/octet-stream",
			"x-now-digest": sha,
			"x-now-size": data.length,
			Authorization
		},
		body: stream
	});

	context.setProgress("Generating Landing Page…");
	const page = await ejs.renderFile(
		__dirname + "/template.ejs",
		{ title: context.defaultFileName, format: context.format },
		{ async: true }
	);

	context.setProgress("Creating Vercel deployment…");
	const deploymentResponse = await context.request(deploymentEndpoint, {
		headers: {
			Authorization
		},
		json: true,
		body: {
			name: context.config.get("name"),
			files: [
				{
					file: context.defaultFileName,
					sha,
					size: data.length
				},
				{
					file: "index.html",
					data: page
				}
			],
			projectSettings: {
				framework: null
			}
		}
	});

	context.copyToClipboard(`https://${deploymentResponse.body.url}`);
	context.notify(
		`URL to the ${context.prettyFormat} has been copied to the clipboard`
	);
};

const vercel = {
	title: "Share on Vercel",
	formats: ["gif", "mp4", "webm", "apng"],
	action,
	config: {
		token: {
			title: "Vercel Personal Access Token",
			description: "Create one here https://vercel.com/account/tokens",
			type: "string",
			required: true
		},
		name: {
			title: "Name used in the deployment URL",
			type: "string",
			default: "kapture",
			required: true
		}
	}
};

exports.shareServices = [vercel];
