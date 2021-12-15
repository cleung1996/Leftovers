var users = [
  {
    'id': 1,
    'Name': 'Charles',
    'email': 'SampleEmail@hotmail.com',
    'points': 3420,
    'photo': '/Mii-boy.png',
    'status': 'Gold',
    'currentData': [{'Item': 'Spinach', 'Qty': 20, 'Expiry Date': '2021-12-18', 'Completed': 11, 'isDonating': false}, {'Item': 'Tomatos', 'Qty': 10, 'Expiry Date': '2021-12-20', 'Completed': 2, 'isDonating': false}, {'Item': 'Beef', 'Qty': 10, 'Expiry Date': '2021-12-20', 'Completed': 6, 'isDonating': false}],
    'tasksNextWeek': [],
    'donationsOut': [{'Item': 'Asparagus', 'Qty': 20, 'Expiry Date': '2021-12-18', 'Completed': 0, 'isDonating': true, 'Address': '44 Tehama St.', 'City': 'San Francisco', 'State': 'CA', 'ZipCode': 94105, 'maxRadius': 50, "lat": 37.6213129, "long": -122.3789554 }],
    'donationsIn': [],
    'password': 'Password',
    'friends': [2,3,4]
  },
  {
    'id': 2,
    'Name': 'Jenny',
    'email': 'jenny123@hotmail.com',
    'points': 2810,
    'photo': '/Mii-girl.png',
    'status': 'Silver',
    'currentData': [{'Item': 'Beets', 'Qty': 15, 'Expiry Date': '2021-12-20', 'Completed': 10, 'isDonating': false }, {'Item': 'Oranges', 'Qty': 5, 'Expiry Date': '2021-12-20', 'Completed': 0, 'isDonating': true}],
    'tasksNextWeek': [],
    'donationsOut': [{'Item': 'Broccoli', 'Qty': 20, 'Expiry Date': '2021-12-18', 'Completed': 0, 'isDonating': true, 'Address': '455 Market St', 'City': 'San Francisco', 'State': 'CA', 'ZipCode': 94105, 'maxRadius': 50, 'lat': 37.790950, 'long': -122.398630 }],
    'donationsIn': [],
    'password': 'Password',
    'friends': [1]
  },
  {
    'id': 3,
    'Name': 'Brian',
    'email': 'brian123@hotmail.com',
    'points': 1029,
    'status': 'Bronze',
    'photo': '/Mii-man.png',
    'currentData': [{'Item': 'Beets', 'Qty': 15, 'Expiry Date': '2021-12-20', 'Completed': 5, 'isDonating': false }, {'Item': 'Oranges', 'Qty': 5, 'Expiry Date': '2021-12-20', 'Completed': 0, 'isDonating': true}],
    'tasksNextWeek': [],
    'donationsOut': [{'Item': 'Carrots', 'Qty': 20, 'Expiry Date': '2021-12-18', 'Completed': 0, 'isDonating': true, 'Address': '399 4th St', 'City': 'San Francisco', 'State': 'CA', 'ZipCode': 94107, 'maxRadius': 50, 'lat': 37.7812623, 'long': -122.3997825 }],
    'donationsIn': [],
    'password': 'password',
    'friends': [1,4]
  },
  {
    'id': 4,
    'Name': 'Jordan',
    'email': 'jordan123@hotmail.com',
    'points': 4862,
    'status': 'Platinum',
    'photo': '/Mii-Oldman.png',
    'currentData': [{'Item': 'Beets', 'Qty': 15, 'Expiry Date': '2021-12-20', 'Completed': 4, 'isDonating': false }, {'Item': 'Oranges', 'Qty': 5, 'Expiry Date': '2021-12-20', 'Completed': 5, 'isDonating': true}],
    'tasksNextWeek': [],
    'donationsOut': [{'Item': 'Beets', 'Qty': 20, 'Expiry Date': '2021-12-18', 'Completed': 0, 'isDonating': true, 'Address': '1 Warriors Way', 'City': 'San Francisco', 'State': 'CA', 'ZipCode': 94158, 'maxRadius': 50, 'lat': 37.7678637, 'long': -122.3866853 }],
    'donationsIn': [],
    'password': 'password',
    'friends': [1,2]
  },
  {
    'id': 5,
    'Name': 'Abc',
    'email': 'Abc',
    'points': 3950,
    'photo': '/Mii-boy.png',
    'currentData': [{'Item': 'Spinach', 'Qty': 20, 'Expiry Date': '2021-12-18', 'Completed': 13, 'isDonating': false}, {'Item': 'Tomatos', 'Qty': 10, 'Expiry Date': '2021-12-20', 'Completed': 2, 'isDonating': false}, {'Item': 'Beef', 'Qty': 10, 'Expiry Date': '2021-12-20', 'Completed': 6, 'isDonating': false}],
    'status': 'Gold',
    'tasksNextWeek': [],
    'donationsIn': [],
    'donationsOut': [{'Item': 'Asparagus', 'Qty': 20, 'Expiry Date': '2021-12-18', 'Completed': 0, 'isDonating': true, 'Address': '627 Jackson St.', 'City': 'San Francisco', 'State': 'CA', 'ZipCode': 94133, 'maxRadius': 50, 'lat': 37.79605, 'long': -122.405643 }],
    'password': 'Abc',
    'friends': [1,2]
  }
]

module.exports = users;