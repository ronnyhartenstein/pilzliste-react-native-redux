import React, { Component } from 'react'
import { Image } from 'react-native'
import _ from 'lodash'

export default function(uris) {
    _.map(uris, (uri) => {
        let startTime = new Date()
        console.log(`Prefetching ${uri} ..`)
        Image.prefetch().then(() => {
            console.log(`✔ Prefetch OK (+${new Date() - startTime}ms) from ${uri}`)
        }, error => {
            console.log(`✘ Prefetch failed (+${new Date() - startTime}ms) from ${uri}`)
        })
    })
}