const AdminModel = require("./../models/AdminModel");
const generateToken = require("./../utils/index");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

// register admin function

const register = asyncHandler(async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // !fullname || !email || !password &&(() => {

    //     res.status(400);
    //     throw new Error("All the fields are required")
    // })

    //
    if (!fullname || !email || !password) {
      res.status(400);
      throw new Error("All the fields are required");
    } else if (password.length < 6) {
      res.status(400);
      throw new Error("password input incorrect");
    }

    // check if admin already exist
    const adminExists = await AdminModel.findOne({ email });
    if (adminExists) {
       return res.status(400).json({msg: "Email already exists"});
     
    }

    // create a new admin in the database
    const admin = await AdminModel.create({ fullname, email, password });

    // generate jwt token for a new admin created
    const token = generateToken(admin._id);

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // expires within 24hrs
      sameSite: "none",
      secure: true,
    });

    // send a success response with admin details and token

    if (admin) {
      const { _id, fullname, email, role } = admin;
      res.status(201).json({ _id, fullname, email, role });
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }
});

// Admin Login function

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    let admin = await AdminModel.findOne({ email });

    // check if admin exists
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // check password

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = generateToken(admin._id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // expires within 24hrs
      sameSite: "none",
      secure: true,
    });

    const { _id, fullname, role } = admin;
    res.status(200).json({
      _id,
      fullname,
      email,
      role,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server error");
  }
});

// get admin function

const getAdmin = asyncHandler(async (req, res) => {
  try {
    // find an admin by id
    const { adminId } = req.params;

    const admin = await AdminModel.findById(adminId);

    if (admin) {
      const { _id, fullname, email, role } = admin;
      res.status(200).json({
        _id,
        fullname,
        email,
        role,
      });
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server error");
  }
});

// Get details of all admins

const getAdmins = asyncHandler(async (req, res) => {
  try {
    const admins = await AdminModel.find()
      .sort("-createedAt")
      .select("-password");

    if (!admins) {
      return res.status(404).json({ msg: "No admin found" });
    }

    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({msg: "Internal Server error"});
  }
});

// update admin function

const updateAdmin = asyncHandler(async (req, res) => {
  const adminId = req.params.adminId;
  const { role } = req.body;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    admin.role = role;
    await admin.save();
    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({msg: "Internal Server error"});
  }
});

// delete admin function

const deleteAdmin = asyncHandler(async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = await AdminModel.findById(adminId);

    if (!admin) {
      res.status(404);
      throw new Error("Admin not found");
    }

    await admin.deleteOne();
    res.status(200).json({ msg: "Admin deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
});

// logout admin function

const adminLogout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({ message: "Logout successful" });
});













module.exports = {
  register,
  login,
  getAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
  adminLogout,
};