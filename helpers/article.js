require('dotenv').config();

const fetch = require('node-fetch');
const extractText = require('./extractText');

const CAPI_PATH = 'https://api.ft.com/enrichedcontent/';

const CAPI_KEY = process.env.CAPI_KEY;

async function getArticleText(uuid) {
	const data = await getArticle(uuid);
	return { text: extractText(data.bodyXML), imageCount: data.embeds.length };
}

function getArticle(uuid) {
	const capiUrl = `${CAPI_PATH}${uuid}?apiKey=${CAPI_KEY}`;
	return fetch(capiUrl)
		.then(res => {
			if (res.status === 400) {
				throw `ERROR: fetch article for uuid=${uuid} status code=${res.status}`;
			}
			return res;
		})
		.then(res => res.text())
		.then(text => JSON.parse(text))
		.catch(err => {
			throw err;
		});
}

module.exports = { getArticleText };
