## RaspberryPi 3
### Node.js
    wget https://nodejs.org/dist/v8.11.3/node-v8.11.3-linux-armv7l.tar.xz
    tar xf node-v8.11.3-linux-armv7l.tar.xz
    cd node-v8.11.3-linux-armv7l.tar.xz
    sudo cp -R * /usr/local/

### MySQL C++ Connector
    sudo apt-get install libmysqlcppconn-dev

### RF24 libs

#### RF24
    wget https://github.com/TMRh20/RF24/archive/master.zip
    unzip RF24-master.zip
    cd RF24-master
    sudo make install -B

#### RF24 Network
    wget https://github.com/TMRh20/RF24Network/archive/master.zip
    unzip RF24Network-master.zip
    cd RF24Network-master
    sudo make install -B

#### RF24 Mesh
    wget https://github.com/TMRh20/RF24Mesh/archive/master.zip
    unzip RF24Mesh-master.zip
    cd RF24Mesh-master
    sudo make install -B