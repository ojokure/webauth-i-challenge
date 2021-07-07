const server = require("./server");
const PORT = process.env.PORT || 3800;

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
