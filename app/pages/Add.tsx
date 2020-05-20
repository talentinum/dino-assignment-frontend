import classNames from 'classnames';
import React, { Component, ReactNode } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import { requestCreateTodo } from '../helper/apiBuilder';

//
//  TODO: 아래 컴포넌트를 구현하여 Todo Item 추가가 가능하도록 해주세요.
//
//  NOTE: 추가 이후 Todo 목록으로 돌아갈 수 있도록 해야 합니다.
//

class Add extends Component<{} & RouteComponentProps> {
  public constructor(props: Readonly<React.Props<{}> & RouteComponentProps>) {
    super(props);
  }

  public render(): ReactNode {
    return <></>;
  }
}

export default withRouter(Add);
