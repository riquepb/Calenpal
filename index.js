const { App } = require("@slack/bolt");
require("dotenv").config();
const fs = require("fs");
const dates = JSON.parse(fs.readFileSync("./calendar.json").toString());

// const app = new App({
//   token: process.env.SLACK_BOT_TOKEN, //Find in the Oauth  & Permissions tab
//   signingSecret: process.env.SLACK_SIGNING_SECRET, // Find in Basic Information Tab
//   // socketMode: true,
//   // appToken: process.env.SLACK_APP_TOKEN, // Token from the App-level Token that we created

//   // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
//   // you still need to listen on some port!
//   port: process.env.PORT || 3000,
// });

const getNextEvent = (date) => {
  const today = new Date();
  const nextEvent = date.filter((event) => {
    const eventDate = new Date(event.start.dateTime);
    return eventDate > today;
  });
  return nextEvent[0];
};

const data = {
  NewYear: { key: "New Year's Day", value: "1-1" },
  GoodFriday: { key: "Good Friday", value: "4-15" },
  EasterMonday: { key: "Easter Monday", value: "4-18" },
  MayBank: { key: "May Bank Holiday", value: "5-2" },
  SpringBank: { key: "Spring Bank Holiday", value: "6-3" },
  SummerBank: { key: "Summer Bank Holiday", value: "8-29" },
  ChristmasDay: { key: "Christmas Day", value: "12-25" },
  BoxingDay: { key: "Boxing Day", value: "12-26" },
};

// console.log(Object.values(data));

const showAllEvents = (dates) => {
  return dates
    .map((date) => {
      return `${date.key} - ${new Date(date.value).toLocaleDateString()}`;
    })
    .join("\n");
};

// app.command("/calenpal", async ({ command, ack, say }) => {
//   try {
//     await ack();
//     let text = command.text; // The inputted parameters
//     if (text === "show next") {
//       say(`next event: ${getNextEvent(dates)}`); // TODO: show next event
//     } else if (text === "show all") {
//       say(`all events: ${json.allEvents}`); // TODO: show all events
//     }
//   } catch (error) {
//     console.error("oops, what happened? ", error);
//   }
// });

console.log(showAllEvents(Object.values(data)));

// (async () => {
//   // await app.start(3000);
//   // console.log("⚡️ Bolt app is running!");
// })();
