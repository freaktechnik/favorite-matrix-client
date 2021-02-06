// Copyright (c) 2021 Martin Giger
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

const getPreference = browser.storage.local.get({ instance: 'app.element.io' }),
    [
        target,
        options
    ] = window.location.hash.split('?'),
    parsedOptions = new URLSearchParams(options);
getPreference
    .then(({ instance }) => {
        parsedOptions.set('web-instance[element.io]', instance);
        window.location.hash = `${target}?${parsedOptions.toString()}`;
    })
    .catch(console.error);
