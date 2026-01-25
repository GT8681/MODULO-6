

// N.1
// {isActive: true}    results: 51
// N.2
//{ "age": { "$gt": 26 } }  results : 54
// N.3
//{"age": {"$gt": 26, "$lte": 30}}   results : 19
// N.4
// {"eyeColor": {"$in": ["brown", "blue"]}}  results :66
// N5.
//{"eyeColor": {"$ne": "green"}}  results : 66
// N.6
//{"eyeColor": {"$nin": ["green", "blue"]}} resuls: 35
// N.7
//{"company": "FITCORE"}  {"email": 1, "_id": 0}
