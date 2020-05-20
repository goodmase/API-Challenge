from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import requests
import os

JOB_SERVER_BASE_URL = os.getenv("JOB_SERVER_BASE_URL", "http://localhost:3000")

app = FastAPI()


class JobRequest(BaseModel):
    name: str = Field("job", description="Name of the job", max_length=255)
    work_length_ms: int = Field(
        1000, ge=0, le=10000, description="Length of time in ms you want to job to run"
    )


class JobResponse(JobRequest):
    id: int
    status: str


def handle_message_api_response(message_response: dict) -> JobResponse:
    return {
        "name": message_response.get("name", ""),
        "work_length_ms": message_response.get("message", {}).get("workLengthMs", -1),
        "status": message_response.get("status", "unknown"),
        "id": message_response.get("id", -1),
    }


@app.get("/job/{job_id}", response_model=JobResponse)
def read_item(job_id: int) -> JobResponse:
    """
    Get a job by id
    """
    url = "/".join([JOB_SERVER_BASE_URL, "message", str(id)])
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
    url = "/".join([JOB_SERVER_BASE_URL, "message"])
    req = requests.post(url, json=payload)
    if req.status_code != 201:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    return handle_message_api_response(req.json())
