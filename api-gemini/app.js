// node --version # Should be >= 18
// npm install @google/generative-ai
var express = require("express");
const md = require('md');

var bodyParser = require('body-parser');

app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
require('dotenv').config();
const MODEL_NAME = "gemini-1.0-pro";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
  temperature: 1,
  topK: 0,
  topP: 0.95,
  maxOutputTokens: 8192,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const chat = model.startChat({
  generationConfig,
  safetySettings,
  history: [
  ],
});

 app.get('/api/:id',function(req,res){
  res.setHeader("Access-Control-Allow-Origin","*"); 
  var result = req.params.id;
  result = JSON.parse(result);

  var zero_shooting = "Partindo da Região "+ result.coords +" do Brasil. Quero saber a a distância de "+result.veiculo +", horas e consumo ate "+ result.municipio +" centro, cultura e lazer";
 
  async function run() {
    const result = await chat.sendMessage(zero_shooting);
    const response = result.response;
    
    var vext = response.candidates[0].content.parts[0].text;
    res.send(md(vext));
  
  }
  run();

});

app.listen(8080, function () {
  console.log("Servidor API Node");
}) 