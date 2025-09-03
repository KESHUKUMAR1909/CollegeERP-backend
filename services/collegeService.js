const collegeRepository = require('../repository/collegeRepo');
const ShortUniqueId = require('short-unique-id');
const { hashFunc } = require('../utils/bcryptFun'); // your bcrypt wrapper
const { sendMail } = require('../utils/sendMail');    // your email sender

const registerCollegeService = async (details) => {
    try {
        // 1. Generate unique 6-digit ERP ID

        const uid = new ShortUniqueId({ length: 6 });  // create instance

        // Generate ID like this:
        const plainErpId = uid.rnd();

        // 2. Send plain ID via email
        await sendMail(details.email, plainErpId);

        // 3. Hash the ERP ID before saving
        const hashedErpId = await hashFunc(plainErpId);

        // 4. Attach hashed ERP ID to college details
        details.uniqueErpId = hashedErpId;

        // 5. Save in DB through repository
        const newCollege = await collegeRepository.registerCollege(details);

        return newCollege;
    } catch (error) {
        console.error("Error in registerCollegeService:", error.message);
        throw error;
    }
};

module.exports = {
    registerCollegeService
};
