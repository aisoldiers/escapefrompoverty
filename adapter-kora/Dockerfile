FROM python:3.12-slim
WORKDIR /app
COPY adapter-kora/app /app/app
COPY wait-for-it.sh /wait-for-it.sh
RUN pip install fastapi uvicorn[standard] requests
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
