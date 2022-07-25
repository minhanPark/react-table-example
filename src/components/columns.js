import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
    Footer: "Id",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "First Name",
    accessor: "first_name",
    Footer: "First Name",
  },
  {
    Header: "Last Name",
    accessor: "last_name",
    Footer: "Last Name",
  },
  {
    Header: "Date Of Birth",
    accessor: "date_of_birth",
    Footer: "Date Of Birth",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Country",
    accessor: "country",
    Footer: "Country",
  },
  {
    Header: "Phone",
    accessor: "phone",
    Footer: "Phone",
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
    Footer: "Id",
  },
  {
    Header: "Name",
    Footer: "Name",
    columns: [
      {
        Header: "First Name",
        accessor: "first_name",
        Footer: "First Name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
        Footer: "Last Name",
      },
    ],
  },
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      {
        Header: "Date Of Birth",
        accessor: "date_of_birth",
        Footer: "Date Of Birth",
      },
      {
        Header: "Country",
        accessor: "country",
        Footer: "Country",
      },
      {
        Header: "Phone",
        accessor: "phone",
        Footer: "Phone",
      },
    ],
  },
];
