import moment from "moment";
import { countTotal } from "../utils/countTotal";

const DocumentTemplate = document => {
  const cafeName = document[0].cafe_name;
  const total = countTotal(document);
  const row = document.map((data, i) => {
    return `
        <tr>
          <td class="text-center">${i + 1}</td>
          <td>${data.transaction_id}</td>
          <td>${data.student_name} - ${data.sender}</td>
          <td>${moment(data.created_at).format("hh:mma")} (${moment(
      data.created_at
    ).format("DD-MM-YY")})</td>
          <td class="text-center">${data.amount}</td>
        </tr>  
          `;
  });

  return `
  <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      <style>
        * {
          margin: 0;
          padding: 0;
        }
  
        body {
          font-size: 11px;
          font-family: Arial, Helvetica, sans-serif;
        }
  
        .line {
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid black;
        }
  
        img {
          width: 10rem;
        }
  
        h1 {
          margin-bottom: 0.2rem;
          font-size: 11px;
          text-transform: uppercase;
        }
  
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: x-small;
        }
  
        th {
          text-transform: uppercase;
        }
  
        th,
        td {
          padding: 4px;
          border: 1px solid black;
          text-align: left;
        }
  
        tr:nth-child(even) {
          background-color: #e6e6e6;
        }
  
        .text-center {
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="line">
        <img
          alt=""
          src="https://www.unisza.edu.my/wp-content/uploads/2021/04/logo_left-1024x385.png" />
      </div>
  
      <h1>Transactions History(Date)</h1>
      <p style="text-transform: uppercase; margin-bottom: 1rem">${cafeName}</p>
      <table>
        <tr>
          <th>No.</th>
          <th>Transaction Id</th>
          <th>Recipient</th>
          <th>Time</th>
          <th class="text-center">Amount(RM)</th>
        </tr>
        ${String.raw({ raw: row })}
        <tr>
          <th colspan="4" style="text-align: right">Total</th>
          <td class="text-center">${total}.00</td>
        </tr>
      </table>
    </body>
  </html>
          `;
};

export default DocumentTemplate;
