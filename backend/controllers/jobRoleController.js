const JobRole = require('../models/JobRole');
const { DEFAULT_JOB_ROLES } = require('../services/skillEngine');

/**
 * @desc Get all Job Roles (seeded in MongoDB)
 * @route GET /api/job-roles
 */
const getJobRoles = async (req, res) => {
  try {
    // Always ensure JobRoles in MongoDB are updated with latest 4-12 LPA INR salary ranges and skills
    for (const defaultRole of DEFAULT_JOB_ROLES) {
      await JobRole.findOneAndUpdate(
        { roleId: defaultRole.roleId },
        {
          $set: {
            title: defaultRole.title,
            category: defaultRole.category,
            icon: defaultRole.icon,
            description: defaultRole.description,
            requiredSkills: defaultRole.requiredSkills,
            desirableSkills: defaultRole.desirableSkills,
            softSkills: defaultRole.softSkills,
            tools: defaultRole.tools,
            salaryRange: defaultRole.salaryRange,
            experienceLevel: defaultRole.experienceLevel,
          },
        },
        { upsert: true, new: true }
      );
    }
    const roles = await JobRole.find();

    return res.status(200).json({
      success: true,
      count: roles.length,
      roles,
    });
  } catch (error) {
    console.error('Job Roles fetch error, returning fallback:', error);
    return res.status(200).json({
      success: true,
      count: DEFAULT_JOB_ROLES.length,
      roles: DEFAULT_JOB_ROLES,
    });
  }
};

/**
 * @desc Get single Job Role by roleId
 * @route GET /api/job-roles/:roleId
 */
const getJobRoleById = async (req, res) => {
  try {
    const role =
      (await JobRole.findOne({ roleId: req.params.roleId })) ||
      DEFAULT_JOB_ROLES.find((r) => r.roleId === req.params.roleId);

    if (!role) {
      return res.status(404).json({ success: false, message: 'Job Role not found' });
    }

    return res.status(200).json({ success: true, role });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching Job Role' });
  }
};

module.exports = {
  getJobRoles,
  getJobRoleById,
};
