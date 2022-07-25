# react-table docs 따라하기

## 왜 사용하는가 ?

react-table은 headless ui 라이브러리이다. react-table 라이브러리는 마크업을 따로 주지 않고, 우리가 기존에 가지고 있는 디자인이나 테마에 적용시킬 수 있도록 만들어져 있다.  
그래서 mui 등과 같이 기존 디자인이 있는 부분에 넣기 더 좋다.

# 설치하기

```bash
npm install react-table
```

위와 같이 설치할 수 있다.

## 기본 형태

```js
// column 형태

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Last Name",
    accessor: "last_name",
  },
];
```

Header는 실제로 보여지는 타이틀이고, accessor는 연결되는 데이터이다.

또한 기본적으로 컬럼 및 데이터가 변경되기 전까지는 다시 렌더링할 필요가 없기 때문에 useMemo를 사용할 것을 권장한다.

```js
const columns = useMemo(() => COLUMNS, []);
const data = useMemo(() => MOCK_DATA, []);
```

그리고 테이블에 컬럼과 데이터를 전달하고 인스턴스를 만들어낸다.

```js
const tableInstance = useTable({
  columns,
  data,
});

const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  tableInstance;
```

헤더를 여러개 지정할 수 있어서 headerGroups가 존재하는 것 같다.

```jsx
<table {...getTableProps()}>
  <thead>
    {headerGroups.map((headerGroup) => {
      return (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
          ))}
        </tr>
      );
    })}
  </thead>
  <tbody {...getTableBodyProps()}>
    {rows.map((row) => {
      prepareRow(row);
      return (
        <tr {...row.getRowProps()}>
          {row.cells.map((cell) => {
            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
          })}
        </tr>
      );
    })}
    <tr>
      <td></td>
    </tr>
  </tbody>
</table>
```

각 속성을 위 처럼 쓸 수 있다.  
prepareRow(row)를 사용하는 이유는 해당 메소드를 통해서 최적화를 할 수 있기 때문이다.

> 렌더링을 위해 행을 razy하게 준비하는 역할을 한다. 테이블 데이터는 잠재적으로 매우 클 수 있으므로 실제로 렌더링 되는 지 여부에 관계없이 모든 행이 렌더링되는데 필요한 모든 상태를 계산하는 것은 매우 비용이 많이 든다. 이 기능을 사용하면 표시하려는 행만 계산되고, 올바른 상태로 준비된다.

## tfoot 넣기

```js
export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
    Footer: "Id",
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
];
```

이렇게 column에 Footer를 넣어주면 tfoot을 사용할 수 있다.

```js
const { footerGroups } = tableInstance;
```

테이블 인스턴스에서 footerGroups을 가져온다.

```jsx
<tfoot>
  {footerGroups.map((footerGroup) => (
    <tr {...footerGroup.getFooterGroupProps()}>
      {footerGroup.headers.map((column) => (
        <td {...column.getFooterProps()}>{column.render("Footer")}</td>
      ))}
    </tr>
  ))}
</tfoot>
```

그리고 위와 같이 해주면 됨

## Header Group

헤더에 그룹을 묶어서 카테고리화 시켜주려면 column을 변경시켜주면 된다.

```js
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
```

위와 같은 형태로 헤더를 중첩하게 만들어내면 그룹된 헤더 형태로 만들어낼 수 있다.

## Sorting

sort 기능을 넣기 위해서 useSortBy 훅이 필요하다.

```js
const tableInstance = useTable(
  {
    columns,
    data,
  },
  useSortBy
);
```

그리고 useTable에 옵션으로 전달해준다.

```jsx
<thead>
  {headerGroups.map((headerGroup) => {
    return (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          <th {...column.getHeaderProps(column.getSortByToggleProps())}>
            {column.render("Header")}
            <span>
              {column.isSorted ? (column.isSortedDesc ? "🔻" : "🔺") : ""}
            </span>
          </th>
        ))}
      </tr>
    );
  })}
</thead>
```

column.getHeaderProps 값에 column.getSortByToggleProps()를 전달해주면 sort를 사용할 수 있다.
isSorted 등을 통해서 아이콘도 같이 사용 가능해진다.

## Formating

테이블 값을 특정한 형태로 포맷팅 해야할 때가 있다. 이때 react-table은 column에서 값의 형태를 바꿀 수 있다.

```js
import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
    Footer: "Id",
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
];
```

date-fns를 설치하고, format 메소드를 가지고 왔다. 해당 메소드를 가지고 Date를 변경해볼 예정이다.  
Cell을 정의해서 value를 받아와 렌더링할 형태를 리턴해주면 된다.

## Global filter

글로벌은 filter 조건에 맞는 데이터가 있는 row를 모두 보여준다는 것이다.

```jsx
export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      Search:{" "}
      <input value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </span>
  );
};
```

위와 같은 GlobalFilter 컴포넌트가 있다. 해당 컴포넌트는 filter와 filter값을 변경할 수 있는 setFilter를 받아서 변경시켜준다.

```jsx
import { useGlobalFilter } from "react-table";

const tableInstance = useTable(
  {
    columns,
    data,
  },
  useGlobalFilter
);
```

사용할 땐 똑같이 옵션에 useGlobalFilter을 넣어준다.

그리고 아래처럼 구조분해를 사용한다.

```js
const { state, setGlobalFilter } = tableInstance;

const { globalFilter } = state;
```

state 안에 globalFilter라는 state가 있고, setGlobalFilter는 해당 state 값을 바꾸는 setter이다.

```jsx
<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
```

위와 같이 필터를 전달해주면 사용할 수 있다.

## column filter

```jsx
export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span>
      Search:{" "}
      <input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};
```

column을 받아서 해당 column에서 filterValue와 setFilter로 구조분해한다.

```js
export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
    Footer: "Id",
    Filter: ColumnFilter,
  },
  {
    Header: "First Name",
    accessor: "first_name",
    Footer: "First Name",
    Filter: ColumnFilter,
  },
  {
    Header: "Last Name",
    accessor: "last_name",
    Footer: "Last Name",
    Filter: ColumnFilter,
  },
  {
    Header: "Date Of Birth",
    accessor: "date_of_birth",
    Footer: "Date Of Birth",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
    Filter: ColumnFilter,
  },
  {
    Header: "Country",
    accessor: "country",
    Footer: "Country",
    Filter: ColumnFilter,
  },
  {
    Header: "Phone",
    accessor: "phone",
    Footer: "Phone",
    Filter: ColumnFilter,
  },
];
```

Column의 Filter 속성에 해당 컴포넌트를 전달해준다.

테이블 컴포넌트에는 훅을 전달해준다.

```jsx
import { useTable, useFilters } from "react-table";

const tableInstance = useTable(
  {
    columns,
    data,
  },
  useFilters
);

<tr {...headerGroup.getHeaderGroupProps()}>
  {headerGroup.headers.map((column) => (
    <th {...column.getHeaderProps()}>
      {column.render("Header")}
      <div>{column.canFilter ? column.render("Filter") : null}</div>
    </th>
  ))}
</tr>;
```

canFilter라고 되어 있어서 column에 filter값을 안 넣은 것들도 있었는데 그러면 에러가 난다.

이럴 때는 disableFilters값으로 true를 전달해주면 된다.

```js
{
    Header: "Id",
    accessor: "id",
    Footer: "Id",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
```
