FROM python:3.9
WORKDIR /code
COPY . .
EXPOSE 9990
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9990"]