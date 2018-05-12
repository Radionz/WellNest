#include <stdlib.h>
#include <iostream>

#include "RF24Mesh/RF24Mesh.h"
#include <RF24/RF24.h>
#include <RF24Network/RF24Network.h>

#include "mysql_connection.h"

#include <cppconn/driver.h>
#include <cppconn/exception.h>
#include <cppconn/resultset.h>
#include <cppconn/statement.h>
#include <cppconn/prepared_statement.h>

using namespace std;

RF24 radio(RPI_V2_GPIO_P1_15, BCM2835_SPI_CS0, BCM2835_SPI_SPEED_8MHZ);
RF24Network network(radio);
RF24Mesh mesh(radio, network);
//dummy header initialization
RF24NetworkHeader header_auth(255, 'A');
bool ok;

struct SensorData
{
  char sensor_name[20];
  uint8_t value;
};

int main(int argc, char **argv)
{
  mesh.setNodeID(0); //Master node always use NodeID 0
  printf("Creating the mesh network... ");
  if (mesh.begin())
    printf("OK\n");
  else
    printf("FAILED\n");

  //radio.printDetails();
  srand(millis());

  sql::Connection *con;

  try
  {
    sql::Driver *driver;
    sql::Statement *stmt;

    /* Create a connection */
    driver = get_driver_instance();
    con = driver->connect("tcp://127.0.0.1:3306", "root", "TOCS2018");
    /* Connect to the MySQL test database */
    con->setSchema("test");

    stmt = con->createStatement();
    stmt->execute("DROP TABLE IF EXISTS wellnest");
    stmt->execute("CREATE TABLE wellnest(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, nodeID INT NOT NULL, sensorName VARCHAR(25), sensorValue INT, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP)");
    delete stmt;
  }
  catch (sql::SQLException &e)
  {
    cout << "# ERR: SQLException in " << __FILE__;
    cout << "(" << __FUNCTION__ << ") on line " << __LINE__ << endl;
    cout << "# ERR: " << e.what();
    cout << " (MySQL error code: " << e.getErrorCode();
    cout << ", SQLState: " << e.getSQLState() << " )" << endl;
  }

  while (1)
  {
    mesh.update();
    mesh.DHCP();

    while (network.available())
    {
      RF24NetworkHeader header;
      network.peek(header);

      uint32_t data = 0;
      SensorData sensorData = {};

      switch (header.type)
      {
      case 'a': //Sensor node request a NodeID
        network.read(header, &data, sizeof(data));
        printf("Node %d (address: %o) request a free nodeID\n", mesh.getNodeID(header.from_node), header.from_node);
        uint8_t FreeNodeID;
        uint16_t next_id;
        ok = false;
        while (!ok)
        {
          FreeNodeID = rand() % 254 + 1;
          ok = true;
          for (int i = 0; i < mesh.addrListTop; i++)
          {
            if (FreeNodeID == mesh.addrList[i].nodeID)
            {
              ok = false;
            }
          }
        }

        memcpy(&header_auth.to_node, &header.from_node, sizeof(uint16_t));
        memcpy(&header_auth.id, &header.next_id, sizeof(uint16_t));
        next_id = header.next_id + (uint16_t)1;
        memcpy(&header_auth.next_id, &next_id, sizeof(uint16_t));
        ok = false;
        while (!ok)
        {
          printf("Sending... ");
          ok = network.write(header_auth, &FreeNodeID, sizeof(FreeNodeID));
          if (!ok)
          {
            delay(50);
            printf("FAILED\n");
          }
          else
          {
            printf("OK\n");
            printf("Sensor node successfully received the free nodeID : %d !\n", FreeNodeID);
          }
        }
        break;
      case 'S':
        network.read(header, &sensorData, sizeof(sensorData));
        printf("%s : %u \t| from nodeID: %d (address: %o)\n", sensorData.sensor_name, sensorData.value, mesh.getNodeID(header.from_node), header.from_node);
        try
        {
          sql::PreparedStatement *pstmt;

          pstmt = con->prepareStatement("INSERT INTO wellnest(nodeID, sensorName, sensorValue) VALUES (?, ?, ?)");
          pstmt->setInt(1, mesh.getNodeID(header.from_node));
          pstmt->setString(2, sensorData.sensor_name);
          pstmt->setInt(3, sensorData.value);
          pstmt->executeUpdate();
          delete pstmt;
        }
        catch (sql::SQLException &e)
        {
          cout << "# ERR: SQLException in " << __FILE__;
          cout << "(" << __FUNCTION__ << ") on line " << __LINE__ << endl;
          cout << "# ERR: " << e.what();
          cout << " (MySQL error code: " << e.getErrorCode();
          cout << ", SQLState: " << e.getSQLState() << " )" << endl;
        }
        break;
      default:
        network.read(header, 0, 0);
        printf("Rcv bad type %d from 0%o\n", header.type, header.from_node);
        break;
      }
    }
    //Carefull not to flood the antenna, needs time to DHCP
    delay(300);
  }

  return 0;
}
