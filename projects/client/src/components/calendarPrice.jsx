import FullCalendar from "@fullcalendar/react";
import dayGridMonth from "@fullcalendar/daygrid";
import { Box } from "@chakra-ui/react";

const CalendarPrice = (props) => {
  const price = props.data.price;
  const Number = parseInt(price);

  const dateFormat = [];
  const event = [];
  // Loop untuk menambahkan tanggal dari sekarang hingga 2025-12-31
  const currentDate = new Date();
  while (currentDate <= new Date("2025-12-31")) {
    dateFormat.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Membuat event untuk tanggal yang unavailable
  const unavailabilityData = props.data.unavailability;
  unavailabilityData.forEach((val) => {
    const end = new Date(val.end);
    end.setDate(end.getDate() + 1);
    event.push({
      id: val.id,
      start: val.start,
      end: end.toISOString().split("T")[0],
      title: "unavailable",
      color: "black",
    });
  });

  // Membuat event untuk special price
  const specialPriceData = props.data.specialPrice;
  console.log(specialPriceData);
  specialPriceData.forEach((val) => {
    const end = new Date(val.end);
    end.setDate(end.getDate() + 1);
    let title;
    if (val.nominal === null) {
      const specialPrice = Number + (Number * val.percent) / 100;
      title = `Rp ${specialPrice.toLocaleString("id")}`;
    } else if (val.percent === null) {
      const specialPrice = Number + val.nominal;
      title = `Rp ${specialPrice.toLocaleString("id")}`;
    }
    event.push({
      id: val.id,
      start: val.start,
      end: end.toISOString().split("T")[0],
      title: title,
      color: "green",
    });
  });

  return (
    <>
      <Box>
        <FullCalendar
          height={600}
          plugins={[dayGridMonth]}
          initialView="dayGridMonth"
          headerToolbar={{
            right: "prevYear,prev,next,nextYear",
          }}
          events={event}
        />
      </Box>
    </>
  );
};

export default CalendarPrice;
