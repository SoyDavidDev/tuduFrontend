module.exports = {
    "header": {
        "image": {
            "src": '/img/branding/tuduHeader.jpeg',
            "alt": 'tudú!',
            "width": 600,
            "height": 400,
            "sources": [
                { "media": '(min-width: 1200px)', "srcset": '/img/web/branding/tuduHeader.jpeg' },
                { "media": '(min-width: 800px)', "srcset": '/img/web/branding/tuduHeader.jpeg' },
                { "media": '(min-width: 400px)', "srcset": '/img/web/branding/tuduHeader.jpeg' }
            ],
            "attrs": {notLazy: true},
            "type": 'image',
            "radius": 'rounded'
        },
        "icon": {
            "src": '/icon/favicon.ico',
            "alt": 'Logo tudú!',
            "isIcon": true,
            "width": 50,
            "height": 50,
            "sources": [
                { "media": '(min-width: 1200px)', "srcset": '/icon/favicon.ico' },
                { "media": '(min-width: 800px)', "srcset": '/icon/favicon.ico' },
                { "media": '(min-width: 400px)', "srcset": '/icon/favicon.ico' }
            ],
            "attrs": {notLazy: true},
            "type": 'icon',
            "radius": 'rounded'
        },
    },
}