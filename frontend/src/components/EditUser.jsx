import React from "react";
import { update_user } from "../Utilities/FetchFunction";

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
    update_user(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            name="First"
            type="text"
            value={this.state.First}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          <input
            name="Last"
            type="text"
            value={this.state.Last}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          <input
            name="Username"
            type="text"
            value={this.state.Username}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          <input
            name="Email"
            type="text"
            value={this.state.Email}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          <input
            name="About"
            type="text"
            value={this.state.About}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          <input
            name="submit"
            type="submit"
            value="Submit"
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}

export default EditUser;
