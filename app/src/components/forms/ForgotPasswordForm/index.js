import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import { isEmpty } from "lodash";
import isEmail from "validator/lib/isEmail";
import InlineError from "../../messages/InlineError";

class ForgotPasswordForm extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired
  };

  state = {
    data: {
      email: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e => {
    const target = e.target;

    this.setState({ data: { [target.name]: target.value } });
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

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && <Message negative>{errors.global}</Message>}

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

        <Button primary>Send</Button>
      </Form>
    );
  }
}

export default ForgotPasswordForm;
