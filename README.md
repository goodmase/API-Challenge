# Start 
To start all the services run `docker-compose up`
* Experience API: `http://localhost:8000/docs`
* Process API: `http://localhost:3000/api`
* Rabbitmq management: `http://localhost:8080`
    * username: guest
    * password: guest

# Usage
1. Navigate to `http://localhost:8000/`
2. Submit a job (example is for 10s) and view the logs.
`curl -X POST "http://localhost:8000/job/" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"name\":\"hello world!\",\"work_length_ms\":10000}"`
3. Submit a 2nd job. The job should be done by the 2nd worker.