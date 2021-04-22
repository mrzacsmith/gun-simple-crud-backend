const app = require("./server/app");

const PORT = process.env.PORT || 8000;

app.listen(PORT, (err) => {
  if (err){

    console.log('hi')
    console.log(err);
  }
  console.log(`\n** Server is listening on port ${PORT}`.america);
});
