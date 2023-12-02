import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Settings from "../foundations/settings";

function AddAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Client");
  const navigate = useNavigate();

  async function handleSubmit() {
    const account = await fetch("http://localhost:5119/api/accounts", {
      method: "GET",
      headers: {
        Authorization: "bearer " + localStorage.getItem("Token"),
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((accounts) => accounts.find((acc: any) => acc.name == username));

    if (account !== undefined) {
      alert("Username already exists");
    } else if (username == "") {
      alert("Enter a username");
    } else if (password == "") {
      alert("Enter a password");
    }
    // WAAR IS CLASS CHECKING?
    else {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("Token"),
        },
        body: JSON.stringify({
          name: username,
          password: password,
          class: userType,
        }),
      };
      fetch("http://localhost:5119/api/accounts", requestOptions).then(
        (response) => response.json()
      );

      alert("Account added");
      navigate("/admin");
    }
  }

  return (
    <div className="text-center">
      <h2>Add Account</h2>
      <div>
        <Input
          name="username"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
      </div>
      <h3></h3>
      <div>
        <Input
          name="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <h3>User Type</h3>
      <div>
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="Admin">Admin</option>
          <option value="Client">Client</option>
          <option value="ServiceEmployee">Service Employee</option>
        </select>
      </div>
      <br />
      <Settings></Settings>
      <Button size="lg" variant="default" onClick={handleSubmit}>
        Add Account
      </Button>
      <h3></h3>
      <Link to="/admin">
        <Button size="default" variant="destructive">
          Back
        </Button>
      </Link>
    </div>
  );
}

export default AddAccount;
