import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import SchedulingApiService from "../../services/SchdulingApiService";

class Calendar extends React.Component{

  state = {
    events : []
  }

  constructor() {
    super();
    this.service = new SchedulingApiService();
  }
  componentDidMount() {
    this.find();
  }

  find = () => {
    this.service
      .findCalendar()
      .then((Response) => {
        const events = Response.data;
        console.log(
          "🚀 ~ file: ViewScheduling.js:32 ~ ViewScheduling ~ scheduling:",
          events
        );
        this.setState({ events: events });
      })
      .catch((error) => {
        console.log(error.Response);
      });
  };

  

  eventContent = (eventInfo) => {
    return (
      <div>
        <h4>{eventInfo.event.title}</h4>
        <p>{eventInfo.event.extendedProps.location}</p>
      </div>
    );
  };

  

 


    
      //title: "futebol",
      //location: "quadra",
      //responsible: "rafael",
      //start: "2023-06-25T15:00:00",
      //end: "2023-06-25T17:00:00",
    //},

    
    render() {
  
    return (
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          footerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={this.state.events}
          eventContent={this.eventContent}
          height="90vh"
        />
      </div>
    );
  

}
}

export default Calendar;