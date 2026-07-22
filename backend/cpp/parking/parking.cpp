#include <iostream>
#include <queue>
#include <sstream>

using namespace std;

int main(int argc, char* argv[]) {

    priority_queue<int, vector<int>, greater<int>> pq;

    if(argc < 2){
        cout << -1;
        return 0;
    }

    string input = argv[1];

    stringstream ss(input);

    int x;

    while(ss >> x){
        pq.push(x);
    }

    if(pq.empty()){
        cout << -1;
    }
    else{
        cout << pq.top();
    }

    return 0;
}