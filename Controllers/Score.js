const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add Score
const add_score = async(req,res) => {
    try{
    const { E_id, score, T_id, punctuality, discipline, standards, remarks } = req.body;   
    const scores = await prisma.score.create({
      data: { E_id, score, T_id, punctuality, discipline, standards, remarks},
    });
        res.json("Successfully added Score");
    }catch(error){
        if(error.code == 'P2002')
            res.json("Score already exists");
        else
            res.json(error);
    }
}

// Fetch scores for training
const get_score = async(req,res) => {
    const T_id = parseInt(req.params.id)
    try{
    const scores = await prisma.score.findMany({
        where:{T_id},
      include : { training:true,
        employee:true
      }
    });
        res.json(scores);
    }catch(error){res.json(error);
    }
}
 // Fetch scores
const get_scores = async(req,res) => {
    try{
    const scores = await prisma.score.findMany({
      include : { training:true,
        employee:true
      }
    });
        res.json(scores);
    }catch(error){res.json(error);
    }
}

module.exports = {add_score, get_score, get_scores}