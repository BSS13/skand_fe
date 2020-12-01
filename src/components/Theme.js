import styled from 'styled-components';

export const Form = styled.form`
  width: 400px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.label`
  font-size: 16px;
  color: #010203;
  text-align: left;
`;



export const Input = styled.input`
  width: 300px;
  height: 35px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

export const Button = styled.button`
  width: 450px;
  height: 35px;
  padding: 5px;
  background-color: #010203;
  color: #dfe3e6;
  border-radius: 3px;
  margin-top: 10px;
  cursor:pointer;
`;


export const Title = styled.h1`
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  color: #4d4d4d;
  font-size: 2.2em;
`;

export const Title2 = styled.h2`
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
  color: #4d4d4d;
  font-size: 1.8em;
`;

export const Text = styled.p`
  font-family: 'Raleway', sans-serif;
  color: ${props => props.color || '#4d4d4d'}
`;

export const Button2 = styled.button`
  color: ${props => props.color || '#4d4d4d'}
  border:none;
  margin-right:2px;
  margin-bottom: 2px;
  padding:10px 30px;
  text-align:center;
  textDecoration:none;
  display:inline-block;
  fontSize:16px;
  cursor:pointer;
  min-width:10px;
  marginBottom:10px;
  background-color: ${props => props.color || '#fff'}
`;

export const Styles = styled.div`
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