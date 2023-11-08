const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const SMSService = {
  sendSMS: async (PhoneNumber, Message, RequestedDateTime = new Date()) => {
    console.log({ PhoneNumber, RequestedDateTime, Message });
    if (typeof Message == "number") {
      Message = `Your Bus-Ticketing OTP is ${Message}`;
    }
    try {
      const Request = {
        UserName: process.env.SMSUserName,
        Password: process.env.SMSPassword,
        Message,
        PhoneNumber,
        RequestedDateTime,
      };
      // const res = await axios.post(process.env.SMSURL, Request);
      const res = {
        data: {
          ResponseCode: 200,
          ResponseMessage: "Message Successfully Send (static OTP)",
        },
      };
      console.log(res.data);
      return res;
    } catch (error) {
      console.log(error);
      return { msg: error.message };
    }
  },
};

module.exports = SMSService;
