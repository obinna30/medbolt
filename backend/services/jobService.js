const db = require("../models");
const { JobListing } = db;


const jobService = {
  postJob: async ({
    title,
    jobType,
    department,
    jobDescription,
    nameOfInstitution,
    location,
    remote,
    yearsOfExperience,
  }) => {
    const result = await JobListing.create({
      title,
      jobType,
      department,
      jobDescription,
      nameOfInstitution,
      location,
      remote,
      yearsOfExperience,
    });

    return result;
  },
  getJobs: async () => {
      const result = await JobListing.findAll()

      return result
  }
};

module.exports = jobService
