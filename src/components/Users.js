import React, { useEffect, useState } from 'react'; 
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTable,  useSortBy, useFilters, usePagination } from 'react-table';
import { connect } from 'react-redux';
import { Filter, DefaultColumnFilter, SelectColumnFilter} from './Filter';
import {  GET_USERS_REQUESTED, DELETE_USER_REQUESTED } from '../redux/actions/user-action';

const Styles = styled.div `
  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({columns, data}) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page, // Instead of using 'rows', we'll use page,
      // which has only the rows for the active page
  
      // The rest of these things are super handy, too ;)
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0 },
        defaultColumn : { Filter: DefaultColumnFilter}
      },
      useFilters,
      useSortBy,
      usePagination
    )

    return (
        <>
           <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>
                        <div {...column.getSortByToggleProps()}>
                        {column.render('Header')}
                        {/* {generateSortingIndicator(column)} */}
                        </div>
                        <Filter column={column}/>
                        </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>  
    
         {/* Pagination */}
         <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>{' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {'>>'}
            </button>{' '}
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <span>
              | Go to page:{' '}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
                style={{ width: '100px' }}
              />
            </span>{' '}
            <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[3, 7, 15].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </>
    
      )
}

const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      Cell: ({cell:{value}}) =>{
        return(
            <>
             <p>{value}</p>
             <Link to={`/user/${value}`}>View</Link>
            <Link to={`/updateuser/${value}`}>Edit</Link>
            {/* <button onClick={deleteUser.bind(this,value)}>Delete</button> */}
             
            </>
        )
    },
      disableFilters: true
    }, {
      Header: 'Email',
      accessor: 'email',
    //   Filter: SelectColumnFilter
    }, {
      Header: 'Jobs Count',
      accessor: 'jobs_count',
      disableFilters: true
    }, {
      Header: 'Active',
      accessor: 'active',
    //   Filter: SelectColumnFilter
    }
  ]



const Users = ({
    user: {loading, users},
    getUsers,
    deleteUser 
}) => {

    useEffect(()=>{
       getUsers();
    },[]);


    

    return(
        <>
        {loading && <h1>Loading details</h1>}
        
        
        <h1>Hello User List Page</h1>
        <Link to="/createUser">Add New User</Link>

        <Styles>
           {users && <Table data = {users} columns={columns}/>}
        </Styles>
        {/* <table>
          <thead>
              <th>ID</th>
              <th>Email</th>
              <th>Jobs Count</th>
              <th>Active</th>
              <th></th>
         </thead>  
        
         <tbody>
        
        
        { users &&  users.map((user)=>(
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.jobs_count}</td>
                    <td>{user.active}</td>
                    <td>
                        <Link to={`/user/${user.id}`}>View</Link> 
                        <Link to={`/updateuser/${user.id}`}>Edit</Link>
                        <button onClick={deleteUser.bind(this,user.id)}>Delete</button>
                    </td>
                </tr>
            ))
            
        }
        </tbody>   
        </table>


         */}
       </>
    )
};

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    getUsers: () => dispatch({type: GET_USERS_REQUESTED}),
    deleteUser: (id) => dispatch({type: DELETE_USER_REQUESTED, payload: id})
})

export default connect(mapStateToProps,mapDispatchToProps)(Users)