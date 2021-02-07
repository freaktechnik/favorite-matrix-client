// Copyright (c) 2021 Martin Giger
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("instance").addEventListener("change", (event) => {
        const { value } = event.target;
        browser.storage.sync.set({ instance: value });
    }, {
        passive: true
    });
    browser.storage.sync.get('instance')
        .then(({ instance }) => {
            if(instance) {
                document.getElementById("instance").value = instance;
            }
        })
        .catch(console.error);
}, {
    once: true,
    passive: true
});
