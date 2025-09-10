import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Button from "./components/Button";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };

    blogService.create(blogObject).then(() => {
      blogService.getAll().then((updatedBlogs) => {
        setBlogs(updatedBlogs); // Refresh the blogs list
        setNewBlogTitle("");
        setNewBlogAuthor("");
        setNewBlogUrl("");
      });
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value);
  };

  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value);
  };

  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value);
  };

  const logoutUser = async () => {
    window.localStorage.removeItem("loggedNoteappUser");
    window.location.reload();
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log into application</h2>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title: <input value={newBlogTitle} onChange={handleBlogTitleChange} />
      </div>
      <div>
        author:{" "}
        <input value={newBlogAuthor} onChange={handleBlogAuthorChange} />
      </div>
      <div>
        url: <input value={newBlogUrl} onChange={handleBlogUrlChange} />
      </div>
      <button type="submit">create</button>
    </form>
  );

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <div>
            {`${user.name} logged in`}{" "}
            <Button
              id="logoutButton"
              text={"logout"}
              onClick={() => logoutUser()}
            ></Button>
            {blogForm()}
          </div>
          <br></br>
          {blogs
            .filter((blog) => blog.user.username === user.username)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
