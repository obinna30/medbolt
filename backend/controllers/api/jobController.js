const jobService = require("../../services/jobService");

const jobController = {
  postJob: async (req, res) => {
    const {
      title,
      jobType,
      department,
      jobDescription,
      nameOfInstitution,
      location,
      remote,
      yearsOfExperience,
    } = req.body;

    try {
      const result = await jobService.postJob({
        title,
        jobType,
        department,
        jobDescription,
        nameOfInstitution,
        location,
        remote,
        yearsOfExperience,
      });

      return res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  getJobs: async (req, res) =>{
      try {
          const result = await jobService.getJobs()
          return res.json(result)
      } catch (err) {
          console.log(err);
          res.status(500).json(err)
      }

  }
};

module.exports = jobController;
