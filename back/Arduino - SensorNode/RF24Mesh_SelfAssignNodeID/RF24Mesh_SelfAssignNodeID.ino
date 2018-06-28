#include "RF24.h"
#include "RF24Network.h"
#include "RF24Mesh.h"
#include <SPI.h>
#include <EEPROM.h>

RF24 radio(7, 8);

RF24Network network(radio);
RF24Mesh mesh(radio, network);

#define DefaultNodeID 255
#define DEBUG true

uint8_t NodeID;

struct SensorData {
  char sensor_name[20];
  uint8_t value;
};

// const int SND_Pin=A0;
// const int LGT_Pin=A2;
// const int TMP_Pin=A4;

void setup() {
  if(DEBUG){
    Serial.begin(115200);
    Serial.print("SETUP | Connecting to the mesh network... ");
  }

  EEPROM.write(0, 0);
  NodeID = EEPROM.read(0);
  mesh.setNodeID(NodeID);
  if (NodeID == 0)
      mesh.setNodeID(DefaultNodeID);

  if(mesh.begin()){
    if(DEBUG)
      Serial.println("OK");
  
    if (mesh.getNodeID() == DefaultNodeID){
      NodeID = getFreeNodeIDFromMasterNode();
      EEPROM.write(0, NodeID);
      
      if(DEBUG)
        Serial.println("Please reboot the arduino !");
      
      delay(100);
      exit(0);
    }
  } else {
    if(DEBUG)
      Serial.println("ERROR");
  }  
}

void loop() {
  mesh.update();
  
  int lightSensorValue = analogRead(A2);
  lightSensorValue = (uint8_t)map(lightSensorValue, 0, 768, 0, 255);
  SensorData lightSensor = {"LGT", lightSensorValue};

  
  if (mesh.write(&lightSensor, 'S', sizeof(lightSensor))) {
    Serial.print("Successfully send ");
    Serial.print(lightSensor.sensor_name);
    Serial.print(" value to master node : ");
    Serial.println(lightSensor.value);
  }

    int soundSensorValue = analogRead(A0);
  soundSensorValue = (uint8_t)map(soundSensorValue, 0, 768, 0, 255);
  SensorData soundSensor = {"SND", soundSensorValue};

  
  if (mesh.write(&soundSensor, 'S', sizeof(soundSensor))) {
    Serial.print("Successfully send ");
    Serial.print(soundSensor.sensor_name);
    Serial.print(" value to master node : ");
    Serial.println(soundSensor.value);
  }

    int temperatureSensorValue = analogRead(A4);
  temperatureSensorValue = (uint8_t)map(temperatureSensorValue, 0, 768, 0, 255);
  SensorData temperatureSensor = {"TMP", temperatureSensorValue};

  
  if (mesh.write(&temperatureSensor, 'S', sizeof(temperatureSensor))) {
    Serial.print("Successfully send ");
    Serial.print(temperatureSensor.sensor_name);
    Serial.print(" value to master node : ");
    Serial.println(temperatureSensor.value);
  }
  
  delay(3000);
}

byte getFreeNodeIDFromMasterNode() {
  if(DEBUG)
    Serial.println("Trying to get a free NodeID from the master node");

  uint8_t d = 0;
  bool addressRequest = false;

  while (!addressRequest) {
    mesh.update();
    if(DEBUG)
      Serial.print("Sending request... ");
    if (mesh.write(&d, 'a', sizeof(d))) {
      if(DEBUG)
        Serial.println("OK");
      addressRequest = true;
    } else {
      if(DEBUG)
        Serial.println("FAILED | Retrying in 1 second");
      delay(1000);
    }
  }
  if(DEBUG)
    Serial.print("Waiting new nodeID from master node... ");

  bool addressResponse = false;
  uint8_t data;

  while (!addressResponse) {
    mesh.update();
    if ( network.available() ) {
      RF24NetworkHeader header;
      network.peek(header);
      
      switch (header.type) {
        case 'A': network.read(header, &data, sizeof(uint8_t));
          if(DEBUG){
            Serial.println("OK");
            Serial.print("New nodeID received: ");
            Serial.println(data);
          }
          addressResponse = true;
          break;
        default:
          if(DEBUG){
            Serial.println("ERROR");
            Serial.println("Other header.type received");
          }
          break;
      }
    }
  }
  
  return data;
}



