const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date");
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();
const months = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12"
];
const renderCalendar = () => {
  // Đặt Thứ Hai là ngày đầu tiên trong tuần
  let firstDayofMonth = (new Date(currYear, currMonth, 1).getDay() + 6) % 7, // tính ngày đầu tiên của tháng, dịch Thứ Hai thành 0
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // ngày cuối cùng của tháng
    lastDayofMonth = (new Date(currYear, currMonth, lastDateofMonth).getDay() + 6) % 7, // ngày cuối cùng của tháng, dịch Thứ Hai thành 0
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // ngày cuối cùng của tháng trước

  let liTag = "";
  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }
  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }
  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} - ${currYear}`;
  daysTag.innerHTML = liTag;
};

renderCalendar();