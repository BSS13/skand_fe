import React, { useEffect, useState } from 'react'; 
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTable,  useSortBy, useFilters, usePagination } from 'react-table';
import { connect } from 'react-redux';
import Header from './Header';
import { Title, Button2 } from './Theme';
import { Filter, DefaultColumnFilter} from './Filter';
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
            <select className="browser-default"
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

    const [color,setColor] = useState(['#4CAF50','#24a0ed','#f0ad4e','#d9534f']);

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
                <Button2 onClick={viewUser} color={color[1]}>View</Button2>
                <Button2 onClick={editUser} color={color[2]}>Edit</Button2>
                <Button2 onClick={deleteUser.bind(this,value)} color={color[3]}>X</Button2>
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
        
         <Header/>
        <Title>Registered Users</Title>
      
        
        <Button2 color={color[0]}><Link style={{textDecoration:'none', color:'#010203'}} to="/createUser">Add New User</Link></Button2>     
        <Styles>
           {users && <Table data = {users} columns={columns}/>}
        </Styles>
        
       </>
    )
};

Users.propTypes = {
    getUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
  }

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    getUsers: () => dispatch({type: GET_USERS_REQUESTED}),
    deleteUser: (id) => dispatch({type: DELETE_USER_REQUESTED, payload: id})
})

export default connect(mapStateToProps,mapDispatchToProps)(Users)