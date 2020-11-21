// cli : node server.js
// browser: localhost/3000/quizzes

// Controller will interact with client
// by listening to http requests and
// going into the server.services then delivering
// some response back to the client

// imports the quizzes-Service which communicates with the database
// to fetch data/ manipulate the database
const quizzesService = require("../services/quizzes-service")


module.exports = (app) => {

  // req -- request
  // res -- response
  // creates a communication between client and this server
  const findAllQuizzes = (req, res) => {
    res.send(quizzesService.findAllQuizzes())
  }

  const findQuizById = (req, res) => {
    // const quizId = req.params["qid"]
    res.send(quizzesService.findQuizById(req.params.qid))
  }

  const createQuiz = (req, res) => {
    // const fooVarValueParam = req.body.fooKeyParam
    res.send(quizzesService.createQuiz())
  }

  const deleteQuiz = (req, res) => {
    const qid = req.params.qid
    res.send(quizzesService.deleteQuiz(qid))
  }

  const updateQuiz = (req, res) => {
    // the ':qid' paramater from the URL in http request
    const qid = req.params.qid
    // the whole body of the http quest which should contain an object for a new quiz
    // can specify specific attribute of body with 'req.body.fooKey'
    const newQuiz = req.body
    // quizzes = quizzes.map(quiz => quiz._id === qid ? newQuiz : quiz)
    res.send(quizzesService.updateQuiz(qid, newQuiz))
  }

  // allow express (object 'app') to handle all incoming
  // client requests
  // app -- express instance
  // .get/ .post / .delete -- client request methods
  // "/foo/bar" -- first arg is the URL request is coming from
  // findQuizById, etc. -- second arg is the function in the server to call
  app.get("/quizzes/:qid", findQuizById)
  app.get("/quizzes", findAllQuizzes)
  app.post("/quizzes", createQuiz)
  app.delete("/quizzes/:qid", deleteQuiz)
  app.put("/quizzes/:qid", updateQuiz)
}

