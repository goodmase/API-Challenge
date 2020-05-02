# API-Challenge
Challenge for API developer position. Please fork this repo to your github and clone from there. When you are finished send an email to danny@aireverie.com and link your repo.

This challenge contains 3 parts which all work together. The overall goal of this project is to create a system in which Python is used to send tasks to a WorkerServer, through a Master server.

### Python
This folder is to hold the python code used to send a request to the MasterServer. We do not care what the response is.

### MasterServer
This is the server which relays job information to a WorkerServer. Normally, this server would also speak with a database, but for the purposes of this challenge you won't have to worry about information that would be stored in a database.

### WorkerServer
This is the server that actually does work. In our case, it will just write a string to a text file. This WorkerServer and the Python never communicate directly, and only communicate through the MasterServer

## Goal
We would like you to create a system in which a python request can be made to a REST API on the MasterServer containing a string as a parameter, and that string will be written to a text file on a WorkerServer. The python is only allowed to interact with the MasterServer, and then MasterServer and WorkerServer must be able to communicate back and forth.

## Flow
The overall flow we are looking for here is as follows:
1. Python makes an HTTP request to the MasterServer, containing a string as a parameter.
2. The MasterServer uses a socket connection with the WorkerServer to emit an event passing the string along.
3. The WorkerServer receives the socket event from the MasterServer, and writes the string to a file.
4. When the WorkerServer is finished writing to a file, it sends an event back through the socket to the MasterServer containing the name of the file.
5. When the MasterServer receives the finished event, it prints the name of the file to the console.

## Other info
* You may use any language you would like to do this challenge. If you are comfortable with Node.js that is preferred, but it is not a requirement and will not cause you to pass/fail this challenge.
* You should split your code up in the 3 provided folders.
* While all of these would normally be run on different computers, feel free to run them all on your local machine simply using different ports. This is to simulate a distributed system.
* Please wrap the python code in an easy to use "library" that will make the request. By library I only mean at least make a wrapper function for the request to make it easier.
* The text file that gets generated on the WorkerServer can be placed in the same folder it runs in, and its name can be randomized.

### If you have any questions at all, please email danny@aireverie.com
This challenge was written up in one day and is prone to not being fully descriptive. I've done my best to write out everything, but feel free to fill in the blanks. All we are looking for is this communication between all 3 parts. How you get there is up to you. But if you have questions, do not hesitate to reach out and I will be more than happy to answer them. I want to make sure you have all of the information you need to complete this challenge.
