import classNames from 'classnames';
import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

import './input.sass';

const InputTag = styled.input`
  border: 0;
  border-bottom: 2px solid #ffca64;
  padding: 2px 4px;
  width: 100%;
  font-size: 16px;
  outline: none;
`;

interface InputProps {
  hide: boolean;
  disabled: boolean;
  regex: RegExp;
  placeholder: string;
  errmsg: string;
}

interface InputState {
  error: boolean;
}

export class Input extends Component<InputProps, InputState> {
  public constructor(props: InputProps) {
    super(props);

    this.state = {
      error: false,
    };

    this.onBlurInput = this.onBlurInput.bind(this);
  }

  public render(): ReactNode {
    return (
      <div>
        <InputTag
          type={this.props.hide ? 'password' : 'text'}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          onFocus={() => this.setState({ error: false })}
          onBlur={this.onBlurInput}
        />
        <p className={classNames('error', { show: this.state.error })}>
          {this.props.errmsg}
        </p>
      </div>
    );
  }

  private onBlurInput(event: React.FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    const error = !this.props.regex.test(value);

    this.setState({ error });
  }
}
