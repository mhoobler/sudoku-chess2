module.exports = (app: any) => {
  app.get("/_firebase", (req: any, res: any) => {
    res.send({ message: "test" });
  });
};
