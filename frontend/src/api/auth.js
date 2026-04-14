import api from "./config";

export async function emailLogin(email, password) {
  try {
    const response = await api.post("/auth/login", { email, password });
    const data = response.data;

    if (data.status === 200) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return {
      status: data.status,
      message: data.message,
      user: data.user,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Login failed";
    return { status: 400, message: errorMessage };
  }
}

export async function createAccount(name, email, password) {
  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    const data = response.data;

    if (data.status === 200) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return {
      status: data.status,
      message: data.message,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error occurred";
    return { status: 500, message: errorMessage };
  }
}

export function check() {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        resolve({ status: 201, message: "User is signed out" });
        return;
      }

      const response = await api.get("/auth/check");
      const data = response.data;

      if (data.status === 200) {
        resolve({
          status: 200,
          message: data.message,
          user: data.user,
          userData: data.userData,
        });
      } else {
        resolve({ status: 201, message: "User is signed out", user: {} });
      }
    } catch (error) {
      // If token is invalid, user is signed out
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      resolve({ status: 201, message: "User is signed out", user: {} });
    }
  });
}

export async function logout() {
  try {
    // Clear local storage
    localStorage.clear();
    // Redirect to '/'
    window.location.href = "/";
  } catch (error) {
    alert("Error logging out:", error);
  }
}

export async function resetPassword(email) {
  try {
    const response = await api.post("/auth/reset-password", { email });
    return { status: response.data.status, message: response.data.message };
  } catch (error) {
    return {
      status: 400,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function sendVerificationEmail(email) {
  try {
    const response = await api.post("/auth/send-verification", { email });
    return { status: response.data.status, message: response.data.message };
  } catch (error) {
    return {
      status: 400,
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export function googleLogin() {
  // Social login not available in Express backend
  alert("Google login is not available. Please use email/password.");
}

export function facebookLogin() {
  // Social login not available in Express backend
  alert("Facebook login is not available. Please use email/password.");
}

export function twitterLogin() {
  // Social login not available in Express backend
}
export async function resetPasswordConfirm(email, code, password) {
  try {
    const response = await api.post("/auth/reset-password-confirm", {
      email,
      code,
      password,
    });
    return { status: response.data.status, message: response.data.message };
  } catch (error) {
    return {
      status: 400,
      message: error.response?.data?.message || error.message,
    };
  }
}
