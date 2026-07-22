#ifndef QUEUE_H
#define QUEUE_H

#include <iostream>
#include <queue>
#include <string>

using namespace std;

class ParkingQueue
{
private:
    queue<string> waitingQueue;

public:
    void enqueueVehicle(string vehicleNumber);
    void dequeueVehicle();
    void showFrontVehicle();
    void displayQueue();
    bool isEmpty();
};

#endif