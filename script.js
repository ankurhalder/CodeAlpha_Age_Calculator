function calculateExactAge(dateOfBirth, currentDate) {
  var years = currentDate.getFullYear() - dateOfBirth.getFullYear();
  var months = currentDate.getMonth() - dateOfBirth.getMonth();
  var days = currentDate.getDate() - dateOfBirth.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    if (months < 0) {
      months += 12;
    }
    if (days < 0) {
      var tempDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        dateOfBirth.getDate()
      );
      var daysInMonth = getDaysInMonth(
        tempDate.getFullYear(),
        tempDate.getMonth()
      );
      days += daysInMonth;
      months--;
    }
  }

  return {
    years: years,
    months: months,
    days: days,
  };
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function calculateAge() {
  var dob = new Date(document.getElementById("dob").value);
  var today = new Date();

  if (isNaN(dob.getTime())) {
    document.getElementById("result").innerHTML =
      "Please enter a valid date of birth.";
    return;
  }

  var age = calculateExactAge(dob, today);
  var message = "";

  if (age.years < 0) {
    message = "You are not born yet!";
  } else if (age.years === 0 && age.months === 0 && age.days === 0) {
    message = "You were born today! Happy birthday!";
  } else {
    message =
      "You are " +
      age.years +
      " years, " +
      age.months +
      " months, and " +
      age.days +
      " days old.";

    var nextBirthday = new Date(
      today.getFullYear(),
      dob.getMonth(),
      dob.getDate()
    );
    if (nextBirthday < today) {
      message += "<br>Your birthday has passed this year.";
    } else if (nextBirthday.getTime() === today.getTime()) {
      message += "<br>Happy birthday!";
    } else {
      var daysUntilBirthday = Math.ceil(
        (nextBirthday.getTime() - today.getTime()) / (1000 * 3600 * 24)
      );
      message += "<br>Days until your next birthday: " + daysUntilBirthday;
    }
  }

  document.getElementById("result").innerHTML = message;
}
