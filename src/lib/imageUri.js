import escapeUri from '../lib/escapeUri'

export const thumbnailUri = function (name) {
    return 'https://uli.rh-flow.de/pilzbilder_klein/' + escapeUri(name) + '.jpg.png'
}

export const imageUri = function(name) {
    return 'https://uli.rh-flow.de/pilzbilder/' + escapeUri(name) + '.jpg'
}
