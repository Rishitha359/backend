const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Gener distribution for all training
const gender_all = async(req,res) => {
    try {
        const distribution = await prisma.score.groupBy({
          by: ['trainingId', 'employee.gender'],
          _count: {
            E_id: true,
          },
          include: {
            employee: true,
            training: true
          },
        });
        res.json(distribution);
    }catch (error) {
        res.status(500).json({ error: 'Error fetching gender distribution' });
    }
}
 

module.exports = {gender_all, gender_train}