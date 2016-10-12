Kleines Beispielprojekt um React Native mit Redux auszuprobieren.


![Screenshot iOS: Listenansicht nach Suchbegriff gefiltertert](screenshot-ios-liste-mit-suche.png) 
![Screenshot iOS: Galerieansicht](screenshot-ios-galerie.png)

TODOs:
- [ ] Demo: Chat: https://github.com/FaridSafi/react-native-gifted-chat
- [ ] Details: Lightbox für Foto: https://github.com/oblador/react-native-lightbox  
- [ ] Formular in Details nach Klick auf Bearbeiten
  - mit Material Kit: http://www.xinthink.com/react-native-material-kit/
- [ ] Suchfilter: Farben, Arten, essbar/giftig
  - Overlay wie http://stackoverflow.com/questions/30638739/transparent-overlay-in-react-native
  - Blur in Scene? https://github.com/react-native-community/react-native-blur
- [ ] Offline-Mode: https://github.com/rauchy/react-native-offline-mode
- [ ] Splashscreen: 
  - https://github.com/crazycodeboy/react-native-splash-screen oder
  - https://github.com/react-native-component/react-native-smart-splash-screen
- [ ] Pilze von Wiki einlesen -> JSON
  - https://de.m.wikipedia.org/wiki/Kategorie:Speisepilzart

Erledigt:
- [x] React App Komponenten Liste + Kopfzeile
- [x] Redux Integration
- [x] Beispieldaten einlesen in State der Liste (JSON-Datensatz)
- [x] Suchbegriff als State halten
- [x] Suchbegriff zum Filtern der Liste nutzen
- [x] nach Tap auf Item Details + Bild zum Pilz (externe URL)
- [x] Details-Bild mit Progress-Bar
- [-] Images in Liste cachen (prefetch)
- [x] Bottom-Navi für Anzahl Treffer
- [x] Pilze faven
- [x] Navigator und Szenen
- [x] Infos von Wiki in WebView
  - https://de.m.wikipedia.org/wiki/Speisepilz
  - https://de.m.wikipedia.org/wiki/Wikipedia:Hinweise_zum_Pilzesammeln
- [x] Demo: Login-Dialog: https://github.com/browniefed/react-native-screens 
