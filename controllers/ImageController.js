const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KET,
});
const openai = new OpenAIApi(configuration);

const img = async (req, res) => {
  const { prompt, size } = req.body;
  try {
    const response = await openai.createImage({
      prompt,
      n: 4,
      size,
    });
    res.status(200).json({
      success: true,
      data: response.data.data,
    });
  } catch (error) {
    if (error.response) {
      res.send({
        success: false,
        data: "API call response error",
      });
      // console.log(error.response.status);
    } else {
      res.send({
        success: false,
        data: "back end error",
      });
      // console.log("back end error");
    }
  }
};

module.exports = { img };
