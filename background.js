async function checkTabURL(tab) {
    if(tab.id && tab.url && /^https?:\/\/matrix.to\/#\//.test(tab.url)) {
        const [
                target,
                options
            ] = tab.url.split('?'),
            parsedOptions = new URLSearchParams(options),
            { instance } = await browser.storage.local.get({ instance: 'app.element.io' });
        if(parsedOptions.get('web-instance[element.io]') !== instance) {
            parsedOptions.set('web-instance[element.io]', instance);
            await browser.tabs.update(tab.id, {
                url: `${target}?${parsedOptions.toString()}`
            });
        }
    }
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
    urls: [ '*://matrix.to/*' ]
});
