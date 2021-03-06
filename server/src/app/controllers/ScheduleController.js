import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import User from '../models/User';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    const { userId: provider_id } = req;

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res.status(401).json({ error: 'user is not a provider' });
    }

    const parseDate = parseISO(req.query.date);

    const appointmets = await Appointment.findAll({
      where: {
        provider_id,
        canceled_at: null,
        date: { [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)] },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
      order: ['date'],
    });

    return res.json(appointmets);
  }
}

export default new ScheduleController();
