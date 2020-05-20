from pydantic import BaseModel, Field


class JobRequest(BaseModel):
    name: str = Field("job", description="Name of the job", max_length=255)
    work_length_ms: int = Field(
        1000, ge=0, le=10000, description="Length of time in ms you want to job to run"
    )


class JobResponse(JobRequest):
    id: int
    status: str
