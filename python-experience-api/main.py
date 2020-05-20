import os
from typing import List
from fastapi import FastAPI, HTTPException
import requests
from schemas.job import JobRequest, JobResponse


MESSAGE_SERVER_BASE_URL = os.getenv("MESSAGE_SERVER_BASE_URL", "http://localhost:3000")

app = FastAPI()


def handle_message_api_response(message_response: dict) -> JobResponse:
    return {
        "name": message_response.get("name", ""),
        "work_length_ms": message_response.get("message", {}).get("workLengthMs", -1),
        "status": message_response.get("status", "unknown"),
        "id": message_response.get("id", -1),
    }


@app.get("/job/", response_model=List[JobResponse])
def list_item() -> List[JobResponse]:
    """
    Get all jobs
    """
    url = "/".join([MESSAGE_SERVER_BASE_URL, "message"])
    req = requests.get(url)
    if req.status_code != 200:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    response = req.json()
    return list(map(handle_message_api_response, req.json()))


@app.get("/job/{job_id}", response_model=JobResponse)
def read_item(job_id: int) -> JobResponse:
    """
    Get a job by id
    """
    url = "/".join([MESSAGE_SERVER_BASE_URL, "message", str(job_id)])
    req = requests.get(url)
    if req.status_code == 404:
        raise HTTPException(status_code=404, detail="Not found")
    elif req.status_code != 200:
        raise HTTPException(status_code=500, detail="Internal Server Error")

    return handle_message_api_response(req.json())


@app.post("/job/", response_model=JobResponse)
def create_item(job: JobRequest) -> JobResponse:
    """
    Create a job that runs for x ms
    """
    payload = {
        "name": job.name,
        "eventName": "job_queue",
        "message": {"workLengthMs": job.work_length_ms},
    }
    url = "/".join([MESSAGE_SERVER_BASE_URL, "message"])
    req = requests.post(url, json=payload)
    if req.status_code != 201:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    return handle_message_api_response(req.json())
