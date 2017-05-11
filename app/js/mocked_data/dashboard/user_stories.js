import UserStory from '../../model/user_story';

var getStoryPoints = (userStories) => {
  var sum = 0;
  for (var i = 0; i < userStories.length; i++) {
    sum += userStories[i].storyPoints;
  }
  return sum;
};

//95 points
var tauSprint5 = [];
//102 points
var tauSprint4 = [
  //14 points
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-03"),
    new Date("2017-04-05")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-04")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-05")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-03"),
    new Date("2017-04-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-03"),
    new Date("2017-04-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-03"),
    new Date("2017-04-04")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-03"),
    new Date("2017-04-05")
  ),
  //second round: 25 points
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-04-03"),
    new Date("2017-04-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-05"),
    new Date("2017-04-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-05"),
    new Date("2017-04-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-05"),
    new Date("2017-04-11")),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-10"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-05"),
    new Date("2017-04-12")),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-10"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-10"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-10"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-10"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-03"),
    new Date("2017-04-13")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-04-03"),
    new Date("2017-04-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-05"),
    new Date("2017-04-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-03"),
    new Date("2017-04-12")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-03"),
    new Date("2017-04-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-03"),
    new Date("2017-04-07")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-03"),
    new Date("2017-04-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-12")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-03"),
    new Date("2017-04-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-03"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-05"),
    new Date("2017-04-14")
  )
];
//99 points
var tauSprint3 = [
  //14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-16")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-19")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-16")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-13"),
    new Date("2017-03-17")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-13"),
    new Date("2017-03-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-13"),
    new Date("2017-03-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-15"),
    new Date("2017-03-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-21"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-16"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-17"),
    new Date("2017-03-23")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-13"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-21"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-16"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-23"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-22"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-21"),
    new Date("2017-03-23")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-16"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-22"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-16"),
    new Date("2017-03-17")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-13"),
    new Date("2017-03-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-14")
  )
];
//95 points
var tauSprint2 = [
  //14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-20"),
    new Date("2017-02-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-20"),
    new Date("2017-02-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-20"),
    new Date("2017-02-22")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-20"),
    new Date("2017-02-25")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-20"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-20"),
    new Date("2017-02-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-20"),
    new Date("2017-02-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-20"),
    new Date("2017-02-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-20"),
    new Date("2017-02-22")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-20"),
    new Date("2017-03-01")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-20"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-20"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-20"),
    new Date("2017-03-02")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-01"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-22"),
    new Date("2017-02-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-23"),
    new Date("2017-02-24")
  )
];
//83 points
var tauSprint1 = [
  //first round: 14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-30"),
    new Date("2017-02-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-30"),
    new Date("2017-02-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-30"),
    new Date("2017-02-31")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-30"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-30"),
    new Date("2017-02-05")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-01-30"),
    new Date("2017-02-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-02"),
    new Date("2017-02-05")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-02-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-02-05"),
    new Date("2017-02-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-05"),
    new Date("2017-02-09")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-02-05"),
    new Date("2017-02-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-05"),
    new Date("2017-02-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-02-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-10")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-01-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-01-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-01-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-05"),
    new Date("2017-01-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-01-08")
  ),
];

//100 points
var thetaSprint5 = [];
//102 points
var thetaSprint4 = [
  //14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-03"),
    new Date("2017-04-05")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-04")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-05")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-03"),
    new Date("2017-04-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-03"),
    new Date("2017-04-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-03"),
    new Date("2017-04-04")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-03"),
    new Date("2017-04-05")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-04-03"),
    new Date("2017-04-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-05"),
    new Date("2017-04-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-05"),
    new Date("2017-04-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-05"),
    new Date("2017-04-11")),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-10"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-05"),
    new Date("2017-04-12")),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-10"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-10"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-10"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-03"),
    new Date("2017-04-13")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-04-03"),
    new Date("2017-04-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-05"),
    new Date("2017-04-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-03"),
    new Date("2017-04-12")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-03"),
    new Date("2017-04-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-03"),
    new Date("2017-04-07")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-03"),
    new Date("2017-04-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-12")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-03"),
    new Date("2017-04-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-03"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-05"),
    new Date("2017-04-14")
  ),
];
//97 points
var thetaSprint3 = [
  //14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-16")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-16")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-13"),
    new Date("2017-03-17")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-13"),
    new Date("2017-03-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-13"),
    new Date("2017-03-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-15"),
    new Date("2017-03-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-21"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-16"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-17"),
    new Date("2017-03-23")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-13"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-21"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-16"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-23"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-22"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-21"),
    new Date("2017-03-23")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-16"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-22"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-16"),
    new Date("2017-03-17")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-13"),
    new Date("2017-03-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-14")
  ),
];
//90 points
var thetaSprint2 = [
  //14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-20"),
    new Date("2017-02-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-20"),
    new Date("2017-02-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-20"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-20"),
    new Date("2017-02-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-20"),
    new Date("2017-02-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-20"),
    new Date("2017-02-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-20"),
    new Date("2017-02-22")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-20"),
    new Date("2017-03-01")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-20"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-20"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-20"),
    new Date("2017-03-02")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-01"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-22"),
    new Date("2017-02-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-23"),
    new Date("2017-02-24")
  )
];
//83 points
var thetaSprint1 = [
  //first round: 14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-30"),
    new Date("2017-02-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-30"),
    new Date("2017-02-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-30"),
    new Date("2017-02-31")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-30"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-30"),
    new Date("2017-02-05")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-01-30"),
    new Date("2017-02-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-02"),
    new Date("2017-02-05")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-02-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-02-05"),
    new Date("2017-02-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-05"),
    new Date("2017-02-09")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-02-05"),
    new Date("2017-02-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-05"),
    new Date("2017-02-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-02-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-10")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-01-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-01-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-01-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-05"),
    new Date("2017-01-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-01-08")
  ),
];


var lambdaSprint5 = [];
var lambdaSprint4 = [
  //14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-03"),
    new Date("2017-04-05")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-04")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-05")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-03"),
    new Date("2017-04-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-03"),
    new Date("2017-04-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-03"),
    new Date("2017-04-04")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-03"),
    new Date("2017-04-05")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-04-03"),
    new Date("2017-04-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-05"),
    new Date("2017-04-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-05"),
    new Date("2017-04-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-05"),
    new Date("2017-04-11")),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-10"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-05"),
    new Date("2017-04-12")),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-10"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-10"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-10"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-03"),
    new Date("2017-04-13")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-04-03"),
    new Date("2017-04-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-05"),
    new Date("2017-04-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-03"),
    new Date("2017-04-12")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-03"),
    new Date("2017-04-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-03"),
    new Date("2017-04-07")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-03"),
    new Date("2017-04-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-12")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-03"),
    new Date("2017-04-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-03"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-05"),
    new Date("2017-04-14")
  ),
];
var lambdaSprint3 = [
  //14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-16")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-16")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-13"),
    new Date("2017-03-17")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-13"),
    new Date("2017-03-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-13"),
    new Date("2017-03-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-15"),
    new Date("2017-03-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-21"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-16"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-17"),
    new Date("2017-03-23")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-13"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-21"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-16"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-23"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-22"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-21"),
    new Date("2017-03-23")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-16"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-22"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-16"),
    new Date("2017-03-17")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-13"),
    new Date("2017-03-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-14")
  ),
];
var lambdaSprint2 = [
  //14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-20"),
    new Date("2017-02-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-20"),
    new Date("2017-02-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-20"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-20"),
    new Date("2017-02-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-20"),
    new Date("2017-02-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-20"),
    new Date("2017-02-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-20"),
    new Date("2017-02-22")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-20"),
    new Date("2017-03-01")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-20"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-20"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-20"),
    new Date("2017-03-02")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-01"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-22"),
    new Date("2017-02-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-23"),
    new Date("2017-02-24")
  ),
];
var lambdaSprint1 = [
  //first round: 14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-30"),
    new Date("2017-02-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-30"),
    new Date("2017-02-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-30"),
    new Date("2017-02-31")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-30"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-30"),
    new Date("2017-02-05")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-01-30"),
    new Date("2017-02-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-02"),
    new Date("2017-02-05")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-02-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-02-05"),
    new Date("2017-02-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-05"),
    new Date("2017-02-09")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-02-05"),
    new Date("2017-02-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-05"),
    new Date("2017-02-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-02-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-10")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-01-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-01-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-01-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-05"),
    new Date("2017-01-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-01-08")
  ),
];

//101 points
var epsSprint5 = [
  //14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-10"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-10"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-10"),
    new Date("2017-04-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-10"),
    new Date("2017-04-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-10"),
    new Date("2017-04-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-10"),
    new Date("2017-04-11")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-04-12"),
    new Date("2017-04-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-10"),
    new Date("2017-04-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-10"),
    new Date("2017-04-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-10"),
    new Date("2017-04-11")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-12"),
    new Date("2017-04-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-12"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-12"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-12"),
    new Date("2017-04-15")),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-10"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-12"),
    new Date("2017-04-18")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-04-12"),
    new Date("2017-04-19")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-15"),
    new Date("2017-04-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-14"),
    new Date("2017-04-18")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-13"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-14"),
    new Date("2017-04-19")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-18"),
    new Date("2017-04-21")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-18")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-14"),
    new Date("2017-04-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-14"),
    new Date("2017-04-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-18"),
    new Date("2017-04-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-20"),
    new Date("2017-04-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-20"),
    new Date("2017-04-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-19"),
    new Date("2017-04-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-19"),
    new Date("2017-04-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-18"),
    new Date("2017-04-20")
  ),

  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-19"),
    new Date("2017-04-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-19"),
    new Date("2017-04-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-18"),
    new Date("2017-04-20")
  ),
];
//105 points
var epsSprint4 = [
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-20"),
    new Date("2017-03-25")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-29")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-20"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-20"),
    new Date("2017-03-22")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-20"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-20"),
    new Date("2017-03-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-20"),
    new Date("2017-03-24")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-22"),
    new Date("2017-03-28")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-22"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-22"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-22"),
    new Date("2017-03-31")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-21"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-22"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-22"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-22"),
    new Date("2017-03-31")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-21"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-23"),
    new Date("2017-03-28")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-22"),
    new Date("2017-03-29")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-21"),
    new Date("2017-03-30")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-23"),
    new Date("2017-03-29")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-23"),
    new Date("2017-03-25")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-23"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-22"),
    new Date("2017-03-29")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-21"),
    new Date("2017-03-30")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-20"),
    new Date("2017-03-29")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-22")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-22"),
    new Date("2017-03-25")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-26"),
    new Date("2017-03-31")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-24"),
    new Date("2017-03-28")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-21"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-28")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-23"),
    new Date("2017-03-25")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-28"),
    new Date("2017-03-30")
  ),
];
//101 points
var epsSprint3 = [
  //14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-27"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-27"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-27"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-27"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-27"),
    new Date("2017-03-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-01"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-01"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-27"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-27"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-27"),
    new Date("2017-03-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-01"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-01"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-01"),
    new Date("2017-03-07")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-01"),
    new Date("2017-03-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-03"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-06"),
    new Date("2017-03-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-06"),
    new Date("2017-03-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-06"),
    new Date("2017-03-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-06"),
    new Date("2017-03-09")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-01"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01"),
    new Date("2017-03-04")),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-06")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01"),
    new Date("2017-03-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-08"),
    new Date("2017-03-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-08"),
    new Date("2017-03-10")),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-07"),
    new Date("2017-03-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-06"),
    new Date("2017-03-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-01"),
    new Date("2017-03-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-06"),
    new Date("2017-03-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-07"),
    new Date("2017-03-10")
  ),
];
//93 point
var epsSprint2 = [
  //first round: 14 points
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-06"),
    new Date("2017-02-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-06"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-06"),
    new Date("2017-02-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-06"),
    new Date("2017-02-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-06"),
    new Date("2017-02-12")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-06"),
    new Date("2017-02-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-06"),
    new Date("2017-02-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-09"),
    new Date("2017-02-12")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-06"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-06"),
    new Date("2017-02-08")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-06"),
    new Date("2017-02-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-06"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-06"),
    new Date("2017-02-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-06"),
    new Date("2017-02-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-02-06"),
    new Date("2017-02-17")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-06"),
    new Date("2017-02-09")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-06"),
    new Date("2017-02-16")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-06"),
    new Date("2017-02-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-02-06"),
    new Date("2017-02-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-09"),
    new Date("2017-02-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-06"),
    new Date("2017-02-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-06"),
    new Date("2017-02-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-06"),
    new Date("2017-02-17")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-06"),
    new Date("2017-02-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-06"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-06"),
    new Date("2017-02-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-11"),
    new Date("2017-02-17")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-11"),
    new Date("2017-01-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-11"),
    new Date("2017-01-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-10"),
    new Date("2017-01-11")
  ),
];
//84 points
var epsSprint1 = [
  //first round: 17 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-16"),
    new Date("2017-01-19")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-16"),
    new Date("2017-01-19")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-16"),
    new Date("2017-01-25")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-16"),
    new Date("2017-01-19")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-16"),
    new Date("2017-01-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-16"),
    new Date("2017-01-18")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-16"),
    new Date("2017-01-19")
  ),
  //second round: 23 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-01-17"),
    new Date("2017-01-27")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-19"),
    new Date("2017-01-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-23"),
    new Date("2017-01-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-19"),
    new Date("2017-01-25")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-18"),
    new Date("2017-01-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-23"),
    new Date("2017-01-27")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-20"),
    new Date("2017-01-25")
  ),
  //Third round: story points 28
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-23"),
    new Date("2017-01-27")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-23"),
    new Date("2017-01-27")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-19"),
    new Date("2017-01-26")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-23"),
    new Date("2017-01-25")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-19"),
    new Date("2017-01-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-23"),
    new Date("2017-01-26")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-18"),
    new Date("2017-01-27")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-16"),
    new Date("2017-01-25")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-24"),
    new Date("2017-01-26")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-18"),
    new Date("2017-01-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-19"),
    new Date("2017-01-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-18")
    //blank
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-16"),
    new Date("2017-01-26")
  ),
];
//console.log("Amount of points in sprint:", getStoryPoints(tauSprint3))

//90
var betaSprint5 = [
  //14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-10"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-10"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-10"),
    new Date("2017-04-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-10"),
    new Date("2017-04-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-10"),
    new Date("2017-04-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-10"),
    new Date("2017-04-11")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-04-12"),
    new Date("2017-04-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-12"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-12"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-12"),
    new Date("2017-04-15")),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-10"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-12"),
    new Date("2017-04-18")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-04-12"),
    new Date("2017-04-19")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-15"),
    new Date("2017-04-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-14"),
    new Date("2017-04-18")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-13"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-14"),
    new Date("2017-04-19")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-18"),
    new Date("2017-04-21")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-18")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-14"),
    new Date("2017-04-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-14"),
    new Date("2017-04-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-18"),
    new Date("2017-04-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-20"),
    new Date("2017-04-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-20"),
    new Date("2017-04-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-19"),
    new Date("2017-04-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-19"),
    new Date("2017-04-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-18"),
    new Date("2017-04-20")
  ),

  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-19"),
    new Date("2017-04-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-19"),
    new Date("2017-04-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-18"),
    new Date("2017-04-20")
  ),
];
//95
var betaSprint4 = [
  //14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-20"),
    new Date("2017-03-25")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-29")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-20"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-20"),
    new Date("2017-03-22")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-20"),
    new Date("2017-03-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-20"),
    new Date("2017-03-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-20"),
    new Date("2017-03-24")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-22"),
    new Date("2017-03-28")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-22"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-22"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-22"),
    new Date("2017-03-31")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-21"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-23"),
    new Date("2017-03-28")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-22"),
    new Date("2017-03-29")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-21"),
    new Date("2017-03-30")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-21"),
    new Date("2017-03-29")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-23"),
    new Date("2017-03-29")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-23"),
    new Date("2017-03-25")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-23"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-22"),
    new Date("2017-03-29")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-21"),
    new Date("2017-03-30")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-20"),
    new Date("2017-03-29")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-22")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-22"),
    new Date("2017-03-25")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-26"),
    new Date("2017-03-31")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-24"),
    new Date("2017-03-28")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-21"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-28"),
    new Date("2017-03-31")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-23"),
    new Date("2017-03-25")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-28"),
    new Date("2017-03-30")
  ),
];
//90 points
var betaSprint3 = [
  //14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-27"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-27"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-27"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-27"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-27"),
    new Date("2017-03-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-01"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-01"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-01"),
    new Date("2017-03-07")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-01"),
    new Date("2017-03-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-03"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-06"),
    new Date("2017-03-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-06"),
    new Date("2017-03-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-06"),
    new Date("2017-03-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-06"),
    new Date("2017-03-09")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-01"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01"),
    new Date("2017-03-04")),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-06")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01"),
    new Date("2017-03-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-08"),
    new Date("2017-03-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-08"),
    new Date("2017-03-10")),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-07"),
    new Date("2017-03-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-06"),
    new Date("2017-03-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-01"),
    new Date("2017-03-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-06"),
    new Date("2017-03-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-07"),
    new Date("2017-03-10")
  ),
];
//85
var betaSprint2 = [
  //first round: 14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-06"),
    new Date("2017-02-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-06"),
    new Date("2017-02-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-06"),
    new Date("2017-02-12")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-06"),
    new Date("2017-02-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-06"),
    new Date("2017-02-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-09"),
    new Date("2017-02-12")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-06"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-06"),
    new Date("2017-02-08")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-06"),
    new Date("2017-02-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-06"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-06"),
    new Date("2017-02-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-06"),
    new Date("2017-02-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-02-06"),
    new Date("2017-02-17")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-06"),
    new Date("2017-02-09")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-06"),
    new Date("2017-02-16")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-06"),
    new Date("2017-02-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-02-06"),
    new Date("2017-02-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-09"),
    new Date("2017-02-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-06"),
    new Date("2017-02-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-06"),
    new Date("2017-02-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-06"),
    new Date("2017-02-17")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-06"),
    new Date("2017-02-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-06"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-06"),
    new Date("2017-02-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-11"),
    new Date("2017-02-17")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-11"),
    new Date("2017-01-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-10"),
    new Date("2017-01-11")
  ),
];
//85 points
var betaSprint1 = [
  //first round: 17 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-16"),
    new Date("2017-01-18")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-16"),
    new Date("2017-01-19")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-16"),
    new Date("2017-01-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-16"),
    new Date("2017-01-25")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-16"),
    new Date("2017-01-16")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-16"),
    new Date("2017-01-19")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-16"),
    new Date("2017-01-19")
  ),
  //second round: 26 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-01-17"),
    new Date("2017-01-27")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-19"),
    new Date("2017-01-19")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-23"),
    new Date("2017-01-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-19"),
    new Date("2017-01-26")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-18"),
    new Date("2017-01-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-01-23")
    //blank
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-20"),
    new Date("2017-01-25")
  ),
  //Third round: story points 28
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-23"),
    new Date("2017-01-27")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-23")
    //blank
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-19"),
    new Date("2017-01-26")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-23"),
    new Date("2017-01-25")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-19"),
    new Date("2017-01-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-23"),
    new Date("2017-01-26")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-18")
    //blank
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-16"),
    new Date("2017-01-25")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-24"),
    new Date("2017-01-26")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-18"),
    new Date("2017-01-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-19"),
    new Date("2017-01-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-18")
    //blank
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-16"),
    new Date("2017-01-26")
  ),
];

//88 points
var alphaSprint5 = [
  //14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-03"),
    new Date("2017-04-05")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-04")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-03"),
    new Date("2017-04-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-03"),
    new Date("2017-04-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-03"),
    new Date("2017-04-04")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-03"),
    new Date("2017-04-05")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-04-03"),
    new Date("2017-04-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-05"),
    new Date("2017-04-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-04-05"),
    new Date("2017-04-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-05"),
    new Date("2017-04-11")),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-10"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-10"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-03"),
    new Date("2017-04-13")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-04-03"),
    new Date("2017-04-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-05"),
    new Date("2017-04-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-03"),
    new Date("2017-04-12")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-03"),
    new Date("2017-04-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-03"),
    new Date("2017-04-07")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-04-03"),
    new Date("2017-04-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-12")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-03"),
    new Date("2017-04-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-04-03"),
    new Date("2017-04-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-03"),
    new Date("2017-04-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-04-05"),
    new Date("2017-04-14")
  ),
];
//92 points
var alphaSprint4 = [
  //14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-16")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-13"),
    new Date("2017-03-17")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-13"),
    new Date("2017-03-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-13"),
    new Date("2017-03-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-03-15"),
    new Date("2017-03-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-21"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-16"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-17"),
    new Date("2017-03-23")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-13"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-21"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-16"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-23"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-22"),
    new Date("2017-03-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-21"),
    new Date("2017-03-23")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-16"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-22"),
    new Date("2017-03-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-16"),
    new Date("2017-03-17")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-15")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-13"),
    new Date("2017-03-14")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-13"),
    new Date("2017-03-14")
  ),
];
//99 points
var alphaSprint3 = [
  //14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-20"),
    new Date("2017-02-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-20"),
    new Date("2017-02-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-20"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-20"),
    new Date("2017-02-24")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-20"),
    new Date("2017-02-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-20"),
    new Date("2017-02-21")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-20"),
    new Date("2017-02-22")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-20"),
    new Date("2017-03-01")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-02-20"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-20"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-20"),
    new Date("2017-02-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-20"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-20"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-20"),
    new Date("2017-03-02")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-03-01"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01"),
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-01"),
    new Date("2017-03-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-03-01"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-03-01"),
    new Date("2017-03-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-22"),
    new Date("2017-02-23")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-23"),
    new Date("2017-02-24")
  ),
];
//92 points
var alphaSprint2 = [
  //first round: 14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-30"),
    new Date("2017-02-02")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-30"),
    new Date("2017-02-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-30"),
    new Date("2017-02-05")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-30"),
    new Date("2017-02-01")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-30"),
    new Date("2017-02-05")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-30"),
    new Date("2017-02-31")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-30"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-30"),
    new Date("2017-02-05")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-01-30"),
    new Date("2017-02-03")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-02"),
    new Date("2017-02-05")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-02-05"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-02-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-02-05"),
    new Date("2017-02-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-05"),
    new Date("2017-02-09")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-02-05"),
    new Date("2017-02-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-05"),
    new Date("2017-02-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-02-08")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-10")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-02-05"),
    new Date("2017-02-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-01-06")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-01-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-01-07")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-02-05"),
    new Date("2017-01-09")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-02-05"),
    new Date("2017-01-08")
  ),
];
//84 points
var alphaSprint1 = [
  //first round: 14 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-09"),
    new Date("2017-01-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-09"),
    new Date("2017-01-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-09"),
    new Date("2017-01-16")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-09"),
    new Date("2017-01-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-09"),
    new Date("2017-01-10")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-09"),
    new Date("2017-01-11")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-09"),
    new Date("2017-01-13")
  ),
  //second round: 25 points 
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-11"),
    new Date("2017-01-16")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-11"),
    new Date("2017-01-12")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-13"),
    new Date("2017-01-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-09"),
    new Date("2017-01-16")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    1,
    new Date("2017-01-12"),
    new Date("2017-01-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    7,
    new Date("2017-01-09"),
    new Date("2017-01-19")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-13"),
    new Date("2017-01-17")
  ),
  //Third round: story points 29
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-13"),
    new Date("2017-01-16")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-16"),
    new Date("2017-01-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-11"),
    new Date("2017-01-18")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-16"),
    new Date("2017-01-18")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-09"),
    new Date("2017-01-13")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-16"),
    new Date("2017-01-19")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-16"),
    new Date("2017-01-18")
  ),
  //Fourth round: 16 point
  new UserStory(
    "As a user i would like to go out and have fun",
    5,
    new Date("2017-01-16"),
    new Date("2017-01-19")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-19"),
    new Date("2017-01-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-18"),
    new Date("2017-01-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-19"),
    new Date("2017-01-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    3,
    new Date("2017-01-18"),
    new Date("2017-01-20")
  ),
  new UserStory(
    "As a user i would like to go out and have fun",
    2,
    new Date("2017-01-16"),
    new Date("2017-01-17")
  ),
];

var unassignedStories = [];

const userStories = {
  alpha: [alphaSprint1, alphaSprint2, alphaSprint3, alphaSprint4, alphaSprint5],
  beta: [betaSprint1, betaSprint2, betaSprint3, betaSprint4, betaSprint5],
  epsilon: [epsSprint1, epsSprint2, epsSprint3, epsSprint4, epsSprint5],
  lambda: [lambdaSprint1, lambdaSprint2, lambdaSprint3, lambdaSprint4, lambdaSprint5],
  theta: [thetaSprint1, thetaSprint2, thetaSprint3, thetaSprint4, thetaSprint5],
  tau: [tauSprint1, tauSprint2, tauSprint3, tauSprint4, tauSprint5],
  unassigned: unassignedStories
};

export default userStories;
