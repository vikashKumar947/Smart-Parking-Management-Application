#include "queue.h"

void ParkingQueue::enqueueVehicle(string vehicleNumber)
{
    waitingQueue.push(vehicleNumber);

    cout << "Vehicle "
         << vehicleNumber
         << " added to waiting queue."
         << endl;
}

void ParkingQueue::dequeueVehicle()
{
    if (waitingQueue.empty())
    {
        cout << "Queue is empty." << endl;
        return;
    }

    cout << "Vehicle "
         << waitingQueue.front()
         << " assigned parking slot."
         << endl;

    waitingQueue.pop();
}

void ParkingQueue::showFrontVehicle()
{
    if (waitingQueue.empty())
    {
        cout << "Queue is empty." << endl;
        return;
    }

    cout << "Next Vehicle : "
         << waitingQueue.front()
         << endl;
}

void ParkingQueue::displayQueue()
{
    if (waitingQueue.empty())
    {
        cout << "No waiting vehicles." << endl;
        return;
    }

    queue<string> temp = waitingQueue;

    cout << "\nWaiting Queue\n";

    while (!temp.empty())
    {
        cout << temp.front() << endl;
        temp.pop();
    }

    cout << endl;
}

bool ParkingQueue::isEmpty()
{
    return waitingQueue.empty();
}