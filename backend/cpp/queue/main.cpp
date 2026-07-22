#include "queue.h"

int main()
{
    ParkingQueue queue;

    queue.enqueueVehicle("PB10AB1234");
    queue.enqueueVehicle("PB10XY5678");
    queue.enqueueVehicle("DL01AA1111");

    queue.displayQueue();

    queue.showFrontVehicle();

    queue.dequeueVehicle();

    queue.displayQueue();

    return 0;
}