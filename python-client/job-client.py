import os
import urllib.parse
import urllib.request
import json
from typing import List

JOB_SERVER_BASE_URL = os.getenv("JOB_SERVER_BASE_URL", "http://localhost:8000")


class JobClient(object):
    """
    A client for interfacing with the job api
    """

    def __init__(self, base_url: str = JOB_SERVER_BASE_URL):
        """
        Parameters
        ----------
        base_url : str, optional
            The base url of the job api
        """
        self.base_url = base_url

    def _create_job_req_url(self, job_id: int = 0):
        if job_id > 0:
            return f"{JOB_SERVER_BASE_URL}/job/{job_id}/"
        else:
            return f"{JOB_SERVER_BASE_URL}/job/"

    def _send_request(self, req):
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode("utf-8"))

    def create_job(self, name: str, runtime_ms: int = 1000) -> dict:
        """
        create a job in the job api

        Parameters
        ----------
        name : str
            name of the job
        runtime_ms : int, optional
            length of time in ms you want the job to run

        Returns
        -------
        dict
            a dict of the job details
        """
        data = json.dumps({"name": name, "work_length_ms": runtime_ms}).encode("utf-8")
        url = self._create_job_req_url()
        req = urllib.request.Request(url, data, method="POST")
        return self._send_request(req)

    def get_job(self, job_id: int) -> dict:
        """
        get a job from the job api

        Parameters
        ----------
        job_id : int
            id of the job

        Returns
        -------
        dict
            a dict of the job details
        """
        url = self._create_job_req_url(job_id)
        req = urllib.request.Request(url)
        return self._send_request(req)

    def list_jobs(self) -> List[dict]:
        """
        lists the current jobs from the job api

        Returns
        -------
        List[dict]
            list of all jobs
        """
        url = self._create_job_req_url()
        req = urllib.request.Request(url)
        return self._send_request(req)


if __name__ == "__main__":
    import time
    import pprint

    pp = pprint.PrettyPrinter()
    client = JobClient()
    sleep_time_s = 0.1
    job_length_ms = 1000
    number_of_jobs = 20
    for i in range(number_of_jobs):
        print(client.create_job(f"job #{i}", job_length_ms))
        time.sleep(sleep_time_s)
    pp.pprint(client.list_jobs())
