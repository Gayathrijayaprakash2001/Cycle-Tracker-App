from flask import Flask, render_template, request
from datetime import datetime, timedelta

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    result = None
    if request.method == "POST":
        # Get the form data from the request
        start_date = request.form["start_date"]
        period_length = int(request.form["period_length"])
        cycle_length = int(request.form["cycle_length"])

        # Convert the start date to a datetime object
        start_date = datetime.strptime(start_date, "%Y-%m-%d")

        # Calculate the next period start date (using the cycle length)
        next_period_start_date = start_date + timedelta(days=cycle_length)

        # Calculate the expected end date (using the period length)
        next_period_end_date = next_period_start_date + timedelta(days=period_length)

        # Format the result as strings to display in the HTML template
        result = {
            "next_period_start": next_period_start_date.strftime("%B %d, %Y"),
            "next_period_end": next_period_end_date.strftime("%B %d, %Y"),
        }

    return render_template("index.html", result=result)

if __name__ == "__main__":
    # Run the Flask app on port 8080
    app.run(debug=True, host="0.0.0.0", port=5000)
