// import React from "react";

// const ClassSelector = ({icon, name, handleClassSelect}) => {

//         // // query individual course populate assignments and tickets
//         const handleCourseSelect =  function(courseId) {
//             const { loading, data } = useQuery(QUERY_COURSE, {
//                 variables: { courseId: courseId },
//             });

//             const course = data?.course || {};
//             console.log(course)
//             console.log("Clicked Course");

//             // return assignment, ticket, newsfeed components
//             // close nav bar

//         },

//   // add notification icons for updates to specific class?
//   return (
//     <div onClick={handleCourseSelect}>
//       <img src={icon} alt={name} Icon></img>
//       <h2>{name}</h2>
//     </div>
//   );
// }

// export default ClassSelector;