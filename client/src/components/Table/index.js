import React from 'react';

import { TableWrapper, TableHeader, TableHead, TableBody, Row, Cell, ActionBox } from './styles';

const Table = ({ columns = [], rows, actions = [], style = {} }) => {
  return (
    <TableWrapper>

      <TableHeader style={style}>
        {
          columns.map((col) => (
            <TableHead key={col.id}>
              {col.text}
            </TableHead>
          ))
        }
      </TableHeader>

      <TableBody>
        {
          rows.map(({ _id, ...row }) => {
            const arrValues = Object.values(row);
            return (
              <Row key={_id} style={style} >
                {arrValues.map((val, i) => (
                  <Cell key={i}>{String(val)}</Cell>
                ))}
                <Cell>
                  {
                    actions.map((a, i) => {
                      return (
                        <ActionBox key={i} onClick={() => a.handleClick(_id)}>
                          {a.icon}
                        </ActionBox>
                      );
                    })
                  }
                </Cell>
              </Row>
            );
          })
        }
      </TableBody>

    </TableWrapper>
  );
};

export default Table;
