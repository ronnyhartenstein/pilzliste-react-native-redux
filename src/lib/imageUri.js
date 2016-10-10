import escapeUri from '../lib/escapeUri'

const domain = 'https://pilze.rh-flow.de'

export const thumbnailUri = function (name) {
    return domain+'/thumbnails/' + escapeUri(name) + '.jpg'
}

export const imageUri = function(name) {
    return domain+'/original/' + escapeUri(name) + '.jpg'
}

export const galerieUri = function(name) {
    return domain+'/galerie/' + escapeUri(name) + '.jpg'
}
