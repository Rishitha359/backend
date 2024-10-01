const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const all_train = async(req, res) => {
    const T_id = req.user.id;
    const events = await prisma.training.findMany({where: {T_id }});
    res.json(events);
}

module.exports = {all_train}