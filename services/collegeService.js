const collegeRepository = require('../repositories/collegeRepository');
const ShortUniqueId = require('short-unique-id');

const registerCollegeService = async (details) => {
    try {
        // ✅ Call repository to register the college
        const uid = new ShortUniqueId({ length: 6 });
        const mailResponse = await sendMail(uid);
        const hasheduniqueErpId = await hashFunc(uid);
        const newCollege = await collegeRepository.registerCollege(details);
        return newCollege; // return data to controller
    } catch (error) {
        console.error("Error in registerCollegeService:", error.message);
        throw error; // let controller handle response
    }
};

module.exports = {
    registerCollegeService
};
