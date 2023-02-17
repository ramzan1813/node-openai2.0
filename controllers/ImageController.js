const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//   res.status(200).json({
//     success: true,
//     data: "hello world",
//   });
// };
const img = async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: "A cute baby sea otter",
      n: 2,
      size: "1024x1024",
    });
    res.status(200).json({
      success: true,
      img
  } catch (error) {
    if (error.respon) {
      res.status(500).json({
        success: false,
      });
    }
  }
};

module.exports = { img };
