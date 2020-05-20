import classNames from 'classnames';
import React, { Component, ReactNode } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import { requestUpdateTodo, requestDeleteTodo } from '../helper/apiBuilder';

//
//  TODO: 아래 컴포넌트를 구현하여 Todo Item 수정 또는 삭제가 가능하도록 해주세요.
//
//  NOTE: 수정 또는 삭제 이후 Todo 목록으로 돌아갈 수 있도록 해야 합니다.
//        sessionStorage를 이용해 defaultValue를 전달 받아주세요. List 컴포넌트의 onClickEdit 함수를 참고해주세요.
//

class Edit extends Component<RouteComponentProps<{ key: string }>> {
  public constructor(
    props: Readonly<React.Props<{}> & RouteComponentProps<{ key: string }>>
  ) {
    super(props);
  }

  public render(): ReactNode {
    return <></>;
  }
}

export default withRouter(Edit);
