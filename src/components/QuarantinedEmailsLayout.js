import React from "react";
import QuarantinedEmailsToolbar from "./QuarantinedEmailsToolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import {QuarantinedEmailDetails} from "./QuarantinedEmailDetails";
import styled from "styled-components";
import {Styles} from "../Styles";
import QuarantinedEmailsTable from "./QuarantinedEmailsTable";

// const Styles = styled.div`
//   padding: 1rem;
//
//   table {
//     border-spacing: 0;
//     border: 1px solid black;
//
//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }
//
//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;
//
//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
//
//   body {
//     background: #F6F7F9;
//   }
//
//   .test {
//     height: 400px;
//     overflow: auto;
//   }
//
//   .emailDetails {
//     margin-top: 20px;
//   }
//
//   .quarantined-emails-layout {
//     display: flex;
//     flex-direction: column;
//   }
// `;

export default function QuarantinedEmailsLayout() {
    return (
        <Styles>
            <div className={'quarantined-emails-layout flex'}>
                <CssBaseline/>
                <QuarantinedEmailsToolbar/>
                <QuarantinedEmailsTable/>
                <QuarantinedEmailDetails/>
            </div>
        </Styles>
    );
}
