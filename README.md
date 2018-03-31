# TOCS 2018 ATOS TEAM : WellNest

Disponible ici **[WellNest](https://wellnest.dobl.fr)**

## Quèsaco WellNest ?

WellNest est un boitier design et discret qui permet de monitorer la qualité de votre environement.

Une interface web permet de visulaliser les variables de qualité de l'environement (Gêne auditive, luminosité inadaptée, qualité de l'air, etc)

### Matériel et coûts

#### Microcontrôleur
Atmega 328p +CH340G (pas de FTDI)
Type Arduino Nano

[2,07€](https://fr.aliexpress.com/item/Freeshipping-Nano-3-0-controller-compatible-for-arduino-nano-CH340-USB-driver-NO-CABLE/32241679858.html?spm=a2g0s.9042311.0.0.LFIAS4)


<img src="https://images-na.ssl-images-amazon.com/images/I/81s7ABhZupL._SL1500_.jpg" alt="Nordic Semiconductors nRF24L01+" width="200"/>

#### Emetteur-Récepteur
Nordic Semiconductors nRF24L01+ (Ultra low power 2.4GHz RF)

[0,63€](https://fr.aliexpress.com/item/Free-Shipping-1PCS-NRF24L01-wireless-data-transmission-module-2-4G-the-NRF24L01-upgrade-version-We-are/32501134468.html?spm=a2g0s.9042311.0.0.LFIAS4)

<img src="https://www.fabtolab.com/image/cache/data/Radio/Transceiver/nff24l01-900x700.JPG" alt="Nordic Semiconductors nRF24L01+" width="200"/>

Le nRF24L01 + est un circuit intégré RF émetteur-récepteur 2 Mbit/s à ultra faible consommation (ULP) pour la bande ISM (industrielle, scientifique et médicale) de 2,4 GHz. Avec des courants de pointe RX / TX inférieurs à 14 mA, un mode de mise sous tension inférieure à 1 μA, une gestion avancée de l'alimentation et une plage d'alimentation de 1,9 à 3,6 V.
Il fournit une véritable solution ULP permettant un fonctionnement pendant des mois ou des années avec des piles AA / AAA.

#### Capteurs

##### Luminosité
##### Micro
##### Qualité de l'air

#### Emetteurs ???

## Comment contribuer ?

### Si vous n'avez pas Node.js

Téléchargez puis installez la dernière version de [Node.js](https://nodejs.org/fr/).

Testez après installation le bon fonctionnement de node et npm.

    npm --version
    node --version

### Installez Ionic et Cordova

    npm install -g cordova ionic

### Clonez le repository actuel

    git clone https://github.com/Radionz/WellNest.git

### Allez dans le répertoire du projet et téléchargez les dépendances 

    cd WellNest
    npm install

Voilà vous êtes prêts !

### Démarrez le serveur de développement ionic (livre-reload)

    ionic serve

## Comment exécuter ?

Simplement placer le répertoire www dans le dossier de votre serveur web.

## Qui sommes nous ?

Trois consultants de la sociéte Atos, dans le domaine du BigData
- Dorian BLANC
- Damien ORSET
- Mohammed EL MOUMNI