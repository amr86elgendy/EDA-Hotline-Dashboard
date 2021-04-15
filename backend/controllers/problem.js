import Problem from "../models/problem.js";

export const create = async (req, res) => {
  try {
    const problem = await Problem.create({ ...req.body });
    res.json(problem);
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

export const getAll = async (req, res) => {
  try {
    const problems = await Problem.find({}).populate("createdBy", "username");
    res.json(problems);
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await Problem.findById(id);
    res.json(problem);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Problem.findByIdAndDelete(id);
    res.send("deleted successfully");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const getByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const problems = await Problem.find({ createdBy: id }).populate(
      "createdBy",
      "username"
    );

    res.json(problems);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const addResponse = async (req, res) => {
  
  try {
    const problem = await Problem.findByIdAndUpdate(
      req.body._id,
      { ...req.body },
      { new: true }
    );
    res.json(problem)
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
