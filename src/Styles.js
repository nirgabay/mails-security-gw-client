import styled from "styled-components";

export const Styles = styled.div`
  padding: 1rem;

  table {
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
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
  
  body {
    background-color: #F6F7F9;
  }
  
  .toolbar {
  
  }
  
  .quarantined-emails-table {
    overflow: auto;
    height: 100%;
  }
  
  .email-details-container {
    margin-top: 20px;
  }
  
  .flex {
    display: flex;
  }
  
  .flex-justify-center {
    justify-content: center;
  }
  
  .width-15 {
    width: 15%;
  }
  
  .quarantined-emails-layout {
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .MuiOutlinedInput-adornedStart {
    max-height: 40px;
  }
  
  .selectAll svg {
     color: white;
   }
`;
