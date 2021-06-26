const { update } = require("../models/student");
const Student = require("../models/student")
const Score = require("../models/test_score")

exports.addCandidate = async (req, res, next) => {
    console.log("Inside");
    if(!req.body.email){
        res.send({message : 'Email is a required field!'});
    }
    if(!req.body.name){
        res.send({message : "Name must be a required field!"});
    }
    const student = await Student.create(req.body);
    res.status(200).json({
        messsage : "Student addedd successfully",
        data : student
    });
};

exports.addScore = async (req, res, next) => {
    if(!req.body.student_id){
        res.send({message : "Please select a student to add score"});
    }
    if(!req.body.first_round && !second_round && !third_round){
        res.send({message : "Please select a round and add a score"});
    }
    const scoreData = await Score.findOne({userId : req.body.student_id}).populate('userId');
    let updated_score;
    if(!scoreData){
            updated_score = await Score.create({
            userId : req.body.student_id,
            ...req.body
        });
    }else{
        updated_score = await Score.findOneAndUpdate({userId : req.body.student_id}, {...req.body},{new:true}).populate('userId');
    }
    // await updated_score.populate({path : 'studentData', select : 'userId'});
    res.status(200).json({
        message : "Score added successfully!",
        data : updated_score,
    })
}

exports.calculateAverage = async (req, res, next) => {
    const average = await Score.aggregate([
              {
                 $group:
                 {
                    "_id":"userId",
                    AvgFirstRound: { $avg: "$first_round" },
                    AvgSecondRound : {$avg : "$second_round"},
                    AvgThirdRound : {$avg : "$third_round"}
                 }
              }
           ]);
    console.log(average)
}