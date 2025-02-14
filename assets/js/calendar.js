(() => {
  const dateTime = '2025-02-01 11:30:00',
    daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date");
  let date = new Date(dateTime),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

  const countDownElement = document.querySelector('.section-calendar .diff-time');
  let interval = setInterval(countDown, 1000);
  function countDown() {
    const now = new Date();
    if (date < now) {
      document.querySelector('.section-calendar .countdown').innerHTML = '';
      clearInterval(interval);
    };
    const distance = Math.abs(date - now);
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const startTo = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const startFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffTime = Math.abs(startTo - startFrom);
    
    const nextDays = [
      'HÔM NAY',
      'NGÀY MAI',
      'NGÀY KIA',
    ];
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (nextDays[diffDays]) {
      clearInterval(interval);
      countDownElement.classList.add('coming');
      countDownElement.innerHTML = nextDays[diffDays];
      return;
    };
    let countdown = 'Còn: ';
    if (days > 0) {
      countdown += `${days} ngày `;
    }
    countdown += `${hours} giờ ${minutes} phút ${seconds} giây.`;
    countDownElement.innerHTML = countdown;
  }
  countDown();
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
  const renderDateTime = () => {
    const dateObj = {
      day: date.getDay(),
      minutes: date.getMinutes().toString().padStart(2, '0'),
      hours: date.getHours().toString().padStart(2, '0'),
      date: date.getDate().toString().padStart(2, '0'),
      month: (date.getMonth() + 1).toString().padStart(2, '0'),
      year: date.getFullYear(),
    };
    const lunarDate = new SolarDate(date).toLunarDate();
    const day = lunarDate.day.toString().padStart(2, '0');
    const month = lunarDate.month.toString().padStart(2, '0');
    const year = lunarDate.getYearName();
    document.querySelector('.lunar-calendar').innerText = `(Tức Ngày ${day} Tháng ${month} Năm ${year})`;
    document.querySelector('.section-intro .fulldate').innerText
      = `${dateObj.date}.${dateObj.month}.${dateObj.year}`;

    const days = [
      "Chủ Nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7"
    ];
    document.querySelector('.section-intro .time').innerText
      = `${days[dateObj.day]} - ${dateObj.hours}h${dateObj.minutes}`;
    document.querySelector('.section-calendar .time').innerText = `${dateObj.hours} giờ ${dateObj.minutes}`;
    document.querySelector('.section-calendar .day').innerText = `${days[dateObj.day]}`;
    document.querySelector('.section-calendar .date').innerText = `${dateObj.date}`;
    document.querySelector('.section-calendar .month').innerText = `Tháng ${dateObj.month}`;
    document.querySelector('.section-calendar .year').innerText = `Năm ${dateObj.year}`;
  }
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
          currMonth === date.getMonth() &&
          currYear === date.getFullYear()
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
  renderDateTime();
})();