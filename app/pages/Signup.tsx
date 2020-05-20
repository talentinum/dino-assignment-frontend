import { AxiosError } from 'axios';
import classNames from 'classnames';
import React, { Component, ReactNode } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import { requestSignup } from '../helper/apiBuilder';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 0 5px;
  max-width: 300px;
  min-height: 700px;
`;
const Title = styled.p`
  font-size: 21px;
  color: #4c4c4c;
`;
const InputContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;
const Input = styled.input`
  border: 0;
  border-bottom: 2px solid #ffca64;
  padding: 2px 4px;
  background-color: transparent;
  width: 100%;
  font-size: 16px;
  outline: none;
`;
const InputError = styled.p`
  visibility: hidden;
  margin: 0;
  padding-left: 10px;
  margin-top: 10px;
  font-size: 13px;
  color: #ff5a5a;
  &.show {
    visibility: unset;
  }
`;
const ButtonContainer = styled.div`
  margin-top: 30px;
`;
const Button = styled.button`
  border: 0;
  border-radius: 4px;
  padding: 0;
  background-color: #ffe4b1;
  min-width: 85px;
  height: 30px;
  font-size: 16px;
  outline: none;
  transition: background-color 0.2s, color 0.2s;
  & + & {
    margin-left: 40px;
  }
  &:not(:disabled) {
    cursor: pointer;
  }
  &:not(:disabled):hover {
    background-color: #ffca64;
  }
`;

interface LoginState {
  email: string | null;
  username: string | null;
  password: string | null;
  emailError: boolean;
  usernameError: boolean;
  passwordError: boolean;
  signing: boolean;
}

class Login extends Component<{} & RouteComponentProps, LoginState> {
  public constructor(props: Readonly<React.Props<{}> & RouteComponentProps>) {
    super(props);

    this.state = {
      email: null,
      username: null,
      password: null,
      emailError: false,
      usernameError: false,
      passwordError: false,
      signing: false,
    };

    this.onBlurEmail = this.onBlurEmail.bind(this);
    this.onBlurUsername = this.onBlurUsername.bind(this);
    this.onBlurPassword = this.onBlurPassword.bind(this);
    this.onClickSignup = this.onClickSignup.bind(this);
  }

  public render(): ReactNode {
    return (
      <Container>
        <Title>Sign Up</Title>
        <InputContainer>
          <Input
            type="text"
            placeholder="Email"
            disabled={this.state.signing}
            onFocus={() => this.setState({ emailError: false })}
            onBlur={this.onBlurEmail}
          />
          <InputError
            className={classNames({
              show: this.state.emailError,
            })}
          >
            Valid email required.
          </InputError>
        </InputContainer>
        <InputContainer>
          <Input
            type="text"
            placeholder="Username"
            disabled={this.state.signing}
            onFocus={() => this.setState({ usernameError: false })}
            onBlur={this.onBlurUsername}
          />
          <InputError
            className={classNames({
              show: this.state.usernameError,
            })}
          >
            Username required.
          </InputError>
        </InputContainer>
        <InputContainer>
          <Input
            type="password"
            placeholder="Password"
            disabled={this.state.signing}
            onFocus={() => this.setState({ passwordError: false })}
            onBlur={this.onBlurPassword}
          />
          <InputError
            className={classNames({
              show: this.state.passwordError,
            })}
          >
            Password must be at least 6 characters long.
          </InputError>
        </InputContainer>
        <ButtonContainer>
          <Button
            type="button"
            disabled={
              !this.state.email ||
              !this.state.username ||
              !this.state.password ||
              this.state.signing
            }
            onClick={this.onClickSignup}
          >
            Sign Up
          </Button>
        </ButtonContainer>
      </Container>
    );
  }

  private onBlurEmail(event: React.FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    const error = !/^\S+\@\S+$/.test(value);

    this.setState({ email: error ? null : value, emailError: error });
  }

  private onBlurUsername(event: React.FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    const error = !/^\S+$/.test(value);

    this.setState({ username: error ? null : value, usernameError: error });
  }

  private onBlurPassword(event: React.FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    const error = !/^.{6,}$/.test(value);

    this.setState({ password: error ? null : value, passwordError: error });
  }

  private async onClickSignup() {
    if (this.state.signing) return;

    this.setState({ signing: true });

    try {
      await requestSignup(
        this.state.email!,
        this.state.username!,
        this.state.password!
      );

      this.props.history.push('/');
    } catch (err) {
      if (err?.response?.status === 409)
        alert('email or username is already taken.');
      else alert('error occurred.');

      this.setState({ signing: false });
    }
  }
}

export default withRouter(Login);
