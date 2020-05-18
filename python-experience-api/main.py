from fastapi import FastAPI
from pydantic import BaseModel, Field
from uuid import UUID, uuid4

app = FastAPI()

class JobRequest(BaseModel):
    name: str = Field(description="Name of the job", max_length="255")
    work_length_ms: int = Field(default=1000, gt=-1, lt=10000, description="Length of time in ms you want to job to run")
 
class JobResponse(JobRequest):
    uuid: UUID
    status: str

@app.get("/job/{job_uuid}")
def read_item(job_uuid: UUID) -> JobResponse:
    """
    Get a job
    """
    # TODO Fetch job from process api
    return {"uuid": job_uuid, "name": "job_name", "work_length_ms": -1, "status": "unknown"}

@app.post("/job/", response_model=JobResponse)
def create_item(job: JobRequest) -> JobResponse:
    """
    Create a job
    """
    # TODO Send job to process api
    return {"uuid": uuid4(), "name": job.name, "work_length_ms": job.work_length_ms, "status": "accepted"}