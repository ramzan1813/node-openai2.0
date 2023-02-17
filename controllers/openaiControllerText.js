// const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
//api call to openai text completion
const openai = new OpenAIApi(configuration);
const APIResult = async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);
  try {
    const respon = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 2048,
      temperature: 0.7,
    });
    data = respon.data.chose[0].text;
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    if (error.respon) {
      //console.log(error.respon.status);
      res.status(500).json({
        success: false,
        error: error.respon.data,
      });
    }
    console.error(error);
  }
};

module.exports = { APIResult };
