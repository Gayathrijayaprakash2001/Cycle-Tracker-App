# Use the official Python image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the project files into the container
COPY . /app

# Install the required Python packages
RUN pip install flask

# Expose port 8080 for the app
EXPOSE 8080

# Run the app
CMD ["python", "app.py"]
