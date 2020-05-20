import classNames from 'classnames';
import React, { Component, ReactNode } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import {
  requestListTodos,
  requestUpdateTodoAccomplishment,
} from '../helper/apiBuilder';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 24px;
  min-height: 700px;
`;
const Message = styled.p`
  font-size: 24px;
  color: #c9c9c9;
`;
const Todo = styled.div`
  border-radius: 6px;
  width: 100%;
  max-width: 600px;
  background-color: white;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.16);
  & + & {
    margin-top: 18px;
  }
`;
const TodoHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  border-radius: 6px 6px 0 0;
  padding: 4px 8px;
  background-color: #ffe4b1;
`;
const TodoAccomplishment = styled.input`
  margin: 0;
  margin-right: 10px;
  width: 2em;
  height: 2em;
`;
const TodoTitle = styled.p`
  margin: 0;
  font-size: 24px;
`;
const TodoDesc = styled.p`
  margin: 0;
  margin-top: 15px;
  padding: 8px 4px;
  padding-left: 24px;
  font-size: 16px;
  &.empty {
    color: #c9c9c9;
    font-style: italic;
  }
`;
const EditLink = styled.a`
  margin-left: auto;
  color: #4c4c4c;
  text-decoration: none;
`;
const AddLink = styled.a`
  margin-top: 40px;
  color: #4c4c4c;
  text-decoration: none;
`;

interface ListState {
  list: {
    key: string;
    title: string;
    desc: string | null;
    accomplished: boolean;
  }[];
}

class List extends Component<{} & RouteComponentProps, ListState> {
  public constructor(props: Readonly<React.Props<{}> & RouteComponentProps>) {
    super(props);

    (async () => {
      try {
        const result = await requestListTodos();

        interface TodoItem {
          id: string;
          title: string;
          desc: string;
          accomplished: boolean;
        }

        this.setState({
          list: result.data.map((item: TodoItem) => {
            return {
              key: item.id,
              title: item.title,
              desc: item.desc || null,
              accomplished: item.accomplished,
            };
          }),
        });
      } catch {
        this.props.history.push('/');
      }
    })();

    this.state = {
      list: [],
    };

    this.onChangeAccomplishment = this.onChangeAccomplishment.bind(this);
  }

  public render(): ReactNode {
    return (
      <Container>
        {this.state.list.length ? (
          this.state.list.map((item) => (
            <Todo key={item.key}>
              <TodoHeader>
                <TodoAccomplishment
                  type="checkbox"
                  defaultChecked={item.accomplished}
                  onChange={(event) =>
                    this.onChangeAccomplishment(event, item.key)
                  }
                />
                <TodoTitle>{item.title}</TodoTitle>
                <EditLink
                  href={`/list/edit/${item.key}`}
                  onClick={() => this.onClickEdit(item.title, item.desc || '')}
                >
                  Edit
                </EditLink>
              </TodoHeader>
              <TodoDesc className={classNames({ empty: !item.desc })}>
                {item.desc || 'N/A'}
              </TodoDesc>
            </Todo>
          ))
        ) : (
          <Message>No todo items yet!</Message>
        )}
        <AddLink href="/list/new">Add a new one</AddLink>
      </Container>
    );
  }

  private async onChangeAccomplishment(
    event: React.FormEvent<HTMLInputElement>,
    key: string
  ) {
    try {
      await requestUpdateTodoAccomplishment(key, event.currentTarget.checked);
    } catch {
      this.props.history.push('/');
    }
  }

  private onClickEdit(title: string, desc: string) {
    sessionStorage.setItem('edit-title', title);
    sessionStorage.setItem('edit-desc', desc);
  }
}

export default withRouter(List);
