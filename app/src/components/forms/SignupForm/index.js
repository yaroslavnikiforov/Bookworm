import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import { isEmpty } from "lodash";
import isEmail from "validator/lib/isEmail";
import InlineError from "../../messages/InlineError";

class SignupForm extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired
  };

  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e => {
    const target = e.target;

    this.setState(state => ({
      data: {
        ...state.data,
        [target.name]: target.value
      }
    }));
  };

  onSubmit = e => {
    e.preventDefault();

    const errors = this.validate(this.state.data);

    this.setState({ errors });

    if (isEmpty(errors)) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch(err =>
        this.setState({
          errors: err.response.data.errors,
          loading: false
        })
      );
    }
  };

  validate = data => {
    const errors = {};

    if (!isEmail(data.email)) {
      errors.email = "Invalid email";
    }

    if (!data.password) {
      errors.password = "Can't be blank";
    }

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={Boolean(errors.email)}>
          <label htmlFor="email">Email</label>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />

          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>

        <Form.Field error={Boolean(errors.password)}>
          <label htmlFor="password">Password</label>

          <input
            type="password"
            id="password"
            name="password"
            placeholder="make it secure"
            value={data.password}
            onChange={this.onChange}
          />

          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <Button primary>Sign Up</Button>
      </Form>
    );
  }
}

export default SignupForm;
