// Copyright (c) 2021 Martin Giger
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

const TWO_SEGMENTS = 2;

async function checkTabURL(tab) {
    if(!(tab.id && tab.url && /^https?:\/\/matrix.to\/#\//.test(tab.url))) {
        return;
    }

    const [
            target,
            options,
        ] = tab.url.split('?', TWO_SEGMENTS),
        parsedOptions = new URLSearchParams(options),
        { instance } = await browser.storage.sync.get({ instance: 'app.element.io' });
    if(parsedOptions.get('web-instance[element.io]') === instance) {
        return;
    }

    parsedOptions.set('web-instance[element.io]', instance);
    await browser.tabs.update(tab.id, {
        url: `${target}?${parsedOptions.toString()}`,
    });
}

browser.tabs.onCreated.addListener((tab) => {
    checkTabURL(tab)
        .catch(console.error);
});
browser.tabs.onUpdated.addListener((tabId, change, tab) => {
    if(tabId && change.hasOwnProperty('url')) {
        checkTabURL(tab)
            .catch(console.error);
    }
}, {
    urls: [ '*://matrix.to/*' ],
});

browser.runtime.onInstalled.addListener(async ({
    previousVersion,
    reason,
}) => {
    if(previousVersion !== '1.0.0' || reason !== 'update') {
        return;
    }

    const { instance } = await browser.storage.local.get({ instance: 'app.element.io' });
    await browser.storage.sync.set({ instance });
});
