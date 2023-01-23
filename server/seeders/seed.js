const db = require('../config/connection');
const { User, Course, Assignment, HelpTicket, Comment } = require('../models');
const userSeeds = require('./userSeeds.json');
const courseSeeds = require('./courseSeeds.json');
const assignmentSeeds = require('./assignmentSeeds.json');

db.once('open', async () => {
  try {

    await Assignment.deleteMany({});
    await Course.deleteMany({});
    await User.deleteMany({});
    await HelpTicket.deleteMany({});
    await Comment.deleteMany({});

    await User.create(userSeeds);

    // for (let i = 0; i < courseSeeds.length; i++) {
    //   const { _id, instructor } = await Course.create(courseSeeds[i]);
    //   const user = await User.findOneAndUpdate(
    //     { username: instructor },
    //     {
    //       $addToSet: {
    //         courses: _id,
    //       },
    //     }
    //   );
    // }

    // for (let i = 0; i < assignmentSeeds.length; i++) {
    //   const { _id, course } = await Assignment.create(assignmentSeeds[i]);
    //   const courseName = await Course.findOneAndUpdate(
    //     { courseTitle: course },
    //     {
    //       $addToSet: {
    //         assignments: _id,
    //       },
    //     }
    //   );
    // }


  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
