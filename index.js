const PDFDocument = require('pdfkit');
const fs = require('fs');
async function fetchData() {
        const response = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=PpLFfsB3svRZ5WQmTTBVb4EimVle9UeS4IMtk9-IFtzVoXOc0P8LtJHGKW_5hyETov2MLVmt3_eyg0NNPAaQPLz4vxZsygohm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKNtqvW5q7xSobAXE2FOJuEq_fHYr8kYzFkb5Cu5lgAZb9fL3mLDwp9t6F9Wu7E3q4cfI-px9kdTtlee6bkKUYWejCcvqTjtpw&lib=MSib8KMYtu98HPisS9O7y0aPF1zpaNOwC");
        let value= await response.json();
        // assuming the response is JSON
        let arr=value.data;
        console.log(arr);  
        const org=arr.filter(item => item.Organization=='OG');
        const content=org.map(t=>t.link);
        console.log(content);
        createPdfTable(content, 'output1.pdf');
        
    }
    fetchData();
function createPdfTable(data, outputPath) {
  // Create a document
  const doc = new PDFDocument();

  // Pipe its output somewhere, like to a file
  doc.pipe(fs.createWriteStream(outputPath));

  // Add the title
  doc.fontSize(16).text('All Important Links Collected in Week', {align: 'center'});
  doc.moveDown();

  // Table settings
  const tableTop = 100;
  const tableLeft = 50;
  const cellPadding = 10;
  const cellWidth = 200;
  const cellHeight = 30;

  // Draw the table
  data.forEach((item, index) => {
    const y = tableTop + index * cellHeight;

    // Draw cell border
    doc.rect(tableLeft, y, cellWidth, cellHeight).stroke();
    
    // Add cell text
    doc.text(item.toString(), tableLeft + cellPadding, y + cellPadding, {
      width: cellWidth - 2 * cellPadding,
      height: cellHeight - 2 * cellPadding
    });
  });

  // Finalize PDF file
  doc.end();

  console.log(`PDF created successfully at ${outputPath}`);
}