// Copyright (c) 2021 Martin Giger
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("instance").addEventListener("change", (event) => {
        const value = event.target.value;
        browser.storage.local.set({ instance: value });
    }, {
        passive: true
    });
    borwser.storage.local.get('instance')
        .then(({ instance }) => {
            if(instance) {
                document.getElementById("instance").value = instance;
            }
        });
}, {
    once: true,
    passive: true
});
