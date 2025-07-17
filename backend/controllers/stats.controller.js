import Sprint from '../models/sprint.model.js';

export const getTopPerformers = async (req, res) => {
  const performers = await Sprint.aggregate([
    { $match: { completed: true } },
    {
      $project: {
        assignedTo: 1,
        durationDays: {
          $divide: [{ $subtract: ['$endDate', '$startDate'] }, 1000 * 60 * 60 * 24]
        },
        points: 1
      }
    },
    {
      $group: {
        _id: '$assignedTo',
        avgPointsPerDay: { $avg: { $divide: ['$points', '$durationDays'] } }
      }
    },
    { $sort: { avgPointsPerDay: -1 } },
    { $limit: 3 }
  ]);
  res.json(performers);
};
