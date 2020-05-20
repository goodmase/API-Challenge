# Start 
To start all the services run `docker-compose up`
* Experience API: `http://localhost:8000/docs`
* Process API: `http://localhost:3000/api`
* Rabbitmq management: `http://localhost:8080`
    * username: guest
    * password: guest

# Demo
1. Navigate to `http://localhost:8000/`
2. Submit a job (example is for 10s) and view the logs.
`curl -X POST "http://localhost:8000/job/" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"name\":\"hello world!\",\"work_length_ms\":10000}"`
3. Submit a 2nd job. The job should be done by the 2nd worker.
4. Submit n number of jobs.
5. view all jobs and their current status `curl -X GET "http://localhost:8000/job/" -H "accept: application/json"`

# Python Client Demo
`python3 ./python-client/job-client.py`

# Info
## python-experience-api
The experience api exposed to end users. 
## node-process-api
A message server that allows you to send generic messages to a specified event listener on a queue.
The experience api leverages this to send a job to the event_listeners "job_queue"
## node-worker
A worker server that can scale to any number of workers. These workers listen to events on "job_queue"
and send updates to "job_queue_update"