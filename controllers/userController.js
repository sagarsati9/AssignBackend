const { User } = require("../models");

// Get all users with pagination, search, and filter
exports.getAllUsers = async (req, res) => {
  try {
    let { page, limit, search, filter, sortKey, sortOrder } = req.query;

    // Default values for pagination
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 10;
    const offset = (page - 1) * limit;

    let whereCondition = {};
    
    // Search users by userName or email
    if (search) {
      whereCondition = {
        [Op.or]: [
          { userName: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      };
    }

    // Filter by enabled or deleted status
    if (filter) {
      whereCondition[filter] = true;
    }

    // Sorting
    const order = [];
    if (sortKey && sortOrder) {
      order.push([sortKey, sortOrder.toUpperCase()]);
    }

    const users = await User.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      order,
    });

    res.json({
      totalUsers: users.count,
      totalPages: Math.ceil(users.count / limit),
      currentPage: page,
      users: users.rows,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { permalink, userName, email, password, enabled, deleted } = req.body;

    if (!permalink || !userName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.create({ permalink, userName, email, password, enabled, deleted });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, { where: { id } });

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user (soft delete)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({ deleted: true });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
