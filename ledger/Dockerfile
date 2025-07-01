FROM python:3.12-slim
WORKDIR /app
COPY common /app/common
COPY ledger/app /app/app
COPY alembic /app/alembic
COPY alembic.ini /app/alembic.ini
COPY wait-for-it.sh /wait-for-it.sh
RUN pip install fastapi uvicorn[standard] sqlmodel psycopg2-binary alembic
CMD ["/wait-for-it.sh", "db:5432", "sh", "-c", "alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000"]
