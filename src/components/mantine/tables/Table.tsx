'use client';
import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import React from 'react';

interface Element {
  [key: string]: any;
}

interface Column {
  key: string;
  displayName: string;
}

interface CustomTableProps {
  columns: Column[];
  elements: Element[];
  actions?: any; // Updated the type here
}

const CustomTable = ({ columns, elements, actions }: CustomTableProps) => {
  const rows = elements.map((element) => (
    <TableTr key={element.id}>
      {columns.map((column) => (
        <TableTd key={column.key}>{element[column.key]}</TableTd>
      ))}
      {actions && (
        <TableTd key="actions" className="flex gap-2">
          {React.createElement(actions, { id: element.id })}
        </TableTd>
      )}
    </TableTr>
  ));

  const tableHeads = columns.map((column) => (
    <TableTh key={column.key}>{column.displayName}</TableTh>
  ));

  if (actions) {
    tableHeads.push(<TableTh key="actions">Actions</TableTh>);
  }

  return (
    <Table>
      <TableThead>
        <TableTr>{tableHeads}</TableTr>
      </TableThead>
      <TableTbody>
        {rows.length > 0 ? (
          rows
        ) : (
          <TableTr>
            <TableTd>No data</TableTd>
          </TableTr>
        )}
      </TableTbody>
    </Table>
  );
};

export default CustomTable;
