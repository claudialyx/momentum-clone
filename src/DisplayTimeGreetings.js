import React from 'react';
import moment from 'moment';


//stateless/dumb component, best to write it into a function component (gets compiled into code of much smaller size)
//like so:

const getGreetingTime = () => {
    const currentHour = new moment().format("HH");
    if (currentHour === 0 || currentHour < 12) return "Good morning"
    else if (currentHour <= 19) return "Good afternon"
    else return "Good evening"
}

const DisplayTimeGreetings = () => {
    const currentTime = new moment().format("hh:mm a")
    return (
        <div>
            <p style={{ fontSize: "600%", margin: "0", display: "flex", alignItems: "center", justifyContent: "center" }}>{currentTime}</p>
            <p style={{ fontSize: "400%", margin: "0", display: "flex", alignItems: "center", justifyContent: "center" }}>{getGreetingTime()} </p>
        </div >
    )
}

export default DisplayTimeGreetings


// instead of :

// class DisplayTimeGreetings extends React.Component {
//     getGreetingTime = () => {
//         const currentHour = new moment().format("HH");
//         if (currentHour === 0 || currentHour < 12) return "Good morning"
//         else if (currentHour <= 19) return "Good afternon"
//         else return "Good evening"
//     }

//     render() {
//         const currentTime = new moment().format("hh:mm a")
//         return (
//             <div>
//                 <p style={{ fontSize: "600%", margin: "0", display: "flex", alignItems: "center", justifyContent: "center" }}>{currentTime}</p>
//                 <p style={{ fontSize: "400%", margin: "0", display: "flex", alignItems: "center", justifyContent: "center" }}>{this.getGreetingTime()} </p>
//             </div >

//         )
//     }
// }