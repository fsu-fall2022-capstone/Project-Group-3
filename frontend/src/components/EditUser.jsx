import React from "react";
import { update_user, delete_user } from "../Utilities/FetchFunction";
import { withAuth0 } from "@auth0/auth0-react";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      First: props.current.FirstName,
      Last: props.current.LastName,
      Username: props.current.Username,
      Email: props.current.Email,
      About: props.current.About,
      OldUsername: props.current.Username,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    update_user(this.state);
    alert("Account has been updated.");
  }

  handleDelete(event) {
    event.preventDefault();
    delete_user(this.state);
    const { logout } = this.props.auth0;
    alert("Account has been deleted.");
    logout({ returnTo: window.location.origin });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              className="m-b"
              name="First"
              type="text"
              value={this.state.First}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            <input
              className="m-b"
              name="Last"
              type="text"
              value={this.state.Last}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            <input
              className="m-b"
              name="Email"
              type="text"
              value={this.state.Email}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            <input
              className="m-b"
              name="About"
              type="text"
              value={this.state.About}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            <input
              className="m-b submitButton"
              name="submit"
              type="submit"
              value="Submit"
              onChange={this.handleInputChange}
            />
          </label>
        </form>
        <button className="deleteUser m-b" onClick={this.handleDelete}>
          Delete Account
        </button>
      </div>
    );
  }
}

export default withAuth0(EditUser);
