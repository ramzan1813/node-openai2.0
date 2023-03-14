// const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KET,
});
// console.log(process.env.OPEN_API_KET);
//api call to openai text completion
const openai = new OpenAIApi(configuration);
const APIResult = async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 500,
      temperature: 0.7,
    });
    res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });
    res.send();
  } catch (error) {
    if (error.response) {
      console.log(error.respon.status);
      res.send(error.response.data);
    } else {
      res.send("back end error \n" + error.message);
    }
  }
};

module.exports = { APIResult };
