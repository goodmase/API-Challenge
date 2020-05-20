FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
RUN pip install requests
COPY . . 
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]