import React, { Component } from 'react'
import { Image } from 'react-native'
import _ from 'lodash'

// Image Prefetch: https://facebook.github.io/react-native/docs/image.html#prefetch

export default function(uris) {
    // console.log("URIs: ", uris)
    prefetch(uris, 0)
}

const prefetch = function(uris, i) {
    const uri = uris[i]
    // console.log("Prefetch",i,uri)
    let startTime = new Date()
    Image.prefetch(uri).then(() => {
        // console.log(`✔ Prefetch OK (+${new Date() - startTime}ms) from ${uri}`)
    }, error => {
        console.log(`✘ Prefetch failed (+${new Date() - startTime}ms) from ${uri}`)
    }).then(() => {
        if (i+2 <= uris.length) {
            prefetch(uris, i+1)
        }
    })
}