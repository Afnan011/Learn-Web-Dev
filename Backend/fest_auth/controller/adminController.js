const Team = require("../model/team");
// const PDFDocument = require('pdfkit');
const puppeteer = require('puppeteer');

const adminRoute = async (req, res) => {
  res.status(200).json({ message: "Admin Route" });
};

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find(
      {},
      {
        email: 0,
        events: 0,
        accommodation: 0,
        paymentStatus: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0
      }
    );
    res.status(200).json(teams);
  } catch (err) {
    console.log("ERROR: " + err);
    res.status(500).json({ message: err.message });
  }
};

const getCodingMems = async (req, res) => {
  try {
    const codingData  = await Team.aggregate([
      { $unwind: "$events.coding" },
      {
        $project: {
          _id: 0,
          teamName: "$teamName",
          name: "$events.coding.name",
          phone: "$events.coding.phone"
        }
      },
      {
        $group: {
          _id: "$teamName",
          members: { $push: { name: "$name", phone: "$phone" } }
        }
      }
    ])

    // generatePDF(res, codingData)

    try {
      const browser = await puppeteer.launch({
        headless: 'new'
      });
      const page = await browser.newPage();
  
      const html = `
      <html>
      <head>
      <title>Coding Participants</title>
          <style>
              section{
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  flex-direction: column;
                  gap: 0.5rem;
              }
              th, td{
                padding: 0.5rem 1.5rem;
            }
          </style>
      </head>
      <body>
          <section>
              <h1 style="text-align:center">Coding</h1>
              <table border=1>
                <thead>
                  <tr>
                    <th>Team Name</th>
                    <th>Participants</th>
                    <th>Contact Number</th>
                  </tr>
                </thead>
                <tbody>
                  ${codingData.map(team => `
                    <tr>
                      <td rowspan="2">${team._id}</td>
                      <td>${team.members[0].name}</td>
                      <td>${team.members[0].phone}</td>
                    </tr>
                    <tr>
                      <td>${team.members[1].name}</td>
                      <td>${team.members[1].phone}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
          </section>
      </body>
      </html>
      `;
  
      await page.setContent(html);
      const pdfBuffer = await page.pdf({ format: 'A4' });
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename=coding-participants.pdf');
      res.send(pdfBuffer);
  
      await browser.close();
    } catch (error) {
      console.error(error);
      res.status(500).send('Error generating PDF');
    }
 

    // res.status(200).json(codingData);
  } catch (err) {
    console.log("ERROR: " + err);
    res.status(500).json({ message: err.message });
  }
};


module.exports = { adminRoute, getAllTeams, getCodingMems };
