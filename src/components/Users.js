import React, { useEffect, useState } from 'react'; 
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useTable,  useSortBy, useFilters, usePagination } from 'react-table';
import { connect } from 'react-redux';
import { Filter, DefaultColumnFilter, SelectColumnFilter} from './Filter';
import {  GET_USERS_REQUESTED, DELETE_USER_REQUESTED } from '../redux/actions/user-action';

const Styles = styled.div `
  table {
    width: 90%;
    border-spacing: 0;
    margin: auto;
    tr {
      :last-child {
        td {
          border-bottom: 10px;
        }
      }
      :nth-child(even) {
        {background-color: #E8E8E8;}
      }
      :hover 
        {background-color: #D8D8D8;}
    }
    th {
        background-color: #010203;
        color: #dfe3e6;
        padding: 10px;
        text-align:center;
    }
    td {
      margin: 0;
      padding: 1rem;
      text-align:center;
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




const Users = ({
    user: {loading, users},
    getUsers,
    deleteUser 
}) => {

    useEffect(()=>{
       getUsers();
    },[]);

    const columns = [
        {
          Header: 'ID',
          accessor: 'id',
          Cell: ({cell:{value}}) =>{

            const history = useHistory();
            const viewUser = ()=>{
               const p =`/user/${value}`;
               history.push(p);
            };

            const editUser = ()=>{
                const p =`/updateuser/${value}`;
                history.push(p);
            };
            return(
                <>


                 <p>{value}</p>
                <button onClick={viewUser} style={{backgroundColor:'#24a0ed',color:'#010203',border:'none',marginRight:'2px',padding:'10px 30px',textAlign:'center',textDecoration:'none',display:'inline-block',fontSize:'16px',cursor:'pointer',minWidth:'10px'}}>View</button>
                <button onClick={editUser} style={{backgroundColor:'#f0ad4e',color:'#010203',border:'none',marginRight:'2px',padding:'10px 30px',textAlign:'center',textDecoration:'none',display:'inline-block',fontSize:'16px',cursor:'pointer',minWidth:'10px'}}>Edit</button>
                <button onClick={deleteUser.bind(this,value)} style={{backgroundColor:'#d9534f',color:'#010203',border:'none',marginRight:'2px',padding:'10px 30px',textAlign:'center',textDecoration:'none',display:'inline-block',fontSize:'16px',cursor:'pointer',minWidth:'10px'}}>X</button>
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
    

    

    return(
        <>
        {loading && <h1>Loading details</h1>}
        
        <nav>
             <div class="nav-wrapper" style={{backgroundColor:'black',color:'#dfe3e6'}}>
             <ul id="nav-mobile" class="right hide-on-med-and-down">
             <li><a href="collapsible.html">Logout</a></li>
             </ul>
            </div>
           </nav>
        <h1>Registered Users</h1>
        <button style={{backgroundColor:'#4CAF50',color:'#010203',border:'none',marginRight:'2px',padding:'10px 30px',textAlign:'center',textDecoration:'none',display:'inline-block',fontSize:'16px',cursor:'pointer',minWidth:'10px',marginBottom:'10px'}}><Link style={{textDecoration:'none', color:'#010203'}} to="/createUser">Add New User</Link></button>
             
        <Styles>
           {users && <Table data = {users} columns={columns}/>}
        </Styles>
        
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