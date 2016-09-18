<?php

$json = [];
$head = [
    'name', // 0. Deutscher Name
    'lat', // 1. Lateinischer Name
    'gattung', // 2. Gattung
    'hut_oben', // 3. Hutoberseite
    'hut_unten', // 4. Hutunterseite 
    'stiel', // 5. Stiel 
    'fleisch', // 6. Fleisch
    'bild', // 7. zweites Bild
    'vorkommen', // 8. Vorkommen 
    'zeitraum', // 9. Erscheinungszeitraum
    'bedeutung', // 10.Bedeutung
    'merkmal' // 11.Bes. Merkmal
];
foreach(glob('PilzDaten20*.java') as $file) {
    $java = file_get_contents($file);
    $matches = [];
    preg_match_all('/pilze\.add\(new String\[\] \{"(.+)"\}\);/m', $java, $matches);
    foreach ($matches[1] as $row) {
        $cols = explode('","', $row);
        if (count($cols) == 13) {
            $json[] = array_combine(array_merge($head,array('nummer')), $cols);
        } else {
            $json[] = array_combine($head, $cols);
        }
        // if (count($cols) != count($head)) {
        //     print $row." ist ".count($cols)."!=".count($head)."\n";
        //     continue;
        // }
    }
}

file_put_contents('pilze.json', json_encode($json, JSON_PRETTY_PRINT));

// hochgeladen zu http://uli.rh-flow.de/pilzbilder/pilze.json
// Bilder hier http://uli.rh-flow.de/pilzbilder/Ziegenlippe.jpg
