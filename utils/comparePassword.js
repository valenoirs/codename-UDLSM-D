const bcrypt = require('bcryptjs');

// ASYNCRONOUS
// const comparePassword = async (newPassword, oldPassword) => {
//     await bcrypt.compare(newPassword, oldPassword, (error, isMatch) => {
//         return isMatch;
//     });
// };

// SYNCRONOUS
const comparePassword = (newPassword, oldPassword) => {
    return bcrypt.compareSync(newPassword, oldPassword);
};

module.exports = comparePassword;