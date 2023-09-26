import FullCalendar from "@fullcalendar/react";
import dayGridMonth from "@fullcalendar/daygrid";

const CalendarPrice = (props) => {
  const price = props.data.price;
  const getDaysArray = (start, end) => {
    for (
      var arr = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };
  const dateList = getDaysArray(new Date(), new Date("2030-12-31"));
  const dateFormat = dateList.map((val) => val.toISOString().split("T")[0]);

  const unavailabilityData = props.data.unavailability;
  const unavailabilityEvent = unavailabilityData.map((val) => {
    const end = new Date(val.end);
    end.setDate(end.getDate() + 1);
    return {
      id: val.id,
      start: val.start,
      end: end.toISOString().split("T")[0],
      title: "unavailable",
      color: "black",
    };
  });

  const specialPriceData = props.data.specialPrice;
  const specialPriceEvent = specialPriceData.map((val) => {
    const end = new Date(val.end);
    end.setDate(end.getDate() + 1);
    if (val.nominal === null) {
      const title = price + (price * val.percent) / 100;
      return {
        id: val.id,
        start: val.start,
        end: end.toISOString().split("T")[0],
        title: `Rp ${title.toLocaleString("id")}`,
        color: "green",
      };
    } else if (val.percent === null) {
      const title = price + val.nominal;
      return {
        id: val.id,
        start: val.start,
        end: end.toISOString().split("T")[0],
        title: `Rp ${title.toLocaleString("id")}`,
        color: "green",
      };
    }
  });

  const eventCombine = [...unavailabilityEvent, ...specialPriceEvent];
  const event = [];
  let endDate = new Date().toISOString().split("T")[0];

  for (let i = 0; i < dateFormat.length; i++) {
    const day = dateFormat[i];
    const filteredEvent = eventCombine.find((e) => e.start === day);
    if (filteredEvent) {
      const title = filteredEvent.title;
      const start = filteredEvent.start;
      const end = filteredEvent.end;
      const color = filteredEvent.color;
      event.push({ title, start, end, color });
      endDate = filteredEvent.end;
    }
  }

  return (
    <FullCalendar
      height={600}
      plugins={[dayGridMonth]}
      initialView="dayGridMonth"
      headerToolbar={{
        right: "prevYear,prev,next,nextYear",
      }}
      events={event}
    />
  );
};

export default CalendarPrice;
