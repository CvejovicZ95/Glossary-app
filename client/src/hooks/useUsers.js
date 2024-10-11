import { toast } from "react-toastify";
import { useAuthContext } from "../context/authContext";
import { registerUser, loginUser, logoutUser } from "../api/userApi";

const validateRegistration = ({ email, username, password }) => {
  if (!email || !username || !password) {
    toast.info("Please fill in all fields");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    toast.info("Invalid email format");
    return false;
  }

  if (password.length < 6) {
    toast.info("Password must be at least 6 characters long");
    return false;
  }

  if (username.length < 3) {
    toast.info("Username must be at least 4 characters long");
    return false;
  }

  return true;
};

const validateLogin = ({ username, password }) => {
  if (!username || !password) {
    toast.info("Please fill in all fields");
    return false;
  }

  return true;
};

export const useRegisterUser = () => {
  const registerHandler = async (email, username, password) => {
    const isValid = validateRegistration({ email, username, password });
    if (!isValid) return;

    const userData = {
      email,
      username,
      password,
    };

    try {
      await registerUser(userData);
      toast.success("Registration complete! Please login in");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  return { registerHandler };
};

export const useLoginUser = () => {
  const { login } = useAuthContext();

  const loginHandler = async (username, password) => {
    const isValid = validateLogin({ username, password });
    if (!isValid) return;

    try {
      const data = await loginUser(username, password);
      login(data);
      localStorage.setItem("currentUser", JSON.stringify(data));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { loginHandler };
};

export const useLogoutUser = () => {
  const { logout } = useAuthContext();

  const logoutHandler = async () => {
    try {
      await logoutUser();
      logout();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { logoutHandler };
};
