
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface IRRData {
  irr: number;
  xirr: number | null;
  initialInvestment: number;
  cashFlows: number[];
  cumulativeReturn: number;
  netProfit: number;
}

export const generatePDF = (data: IRRData): void => {
  const doc = new jsPDF();
  
  // Helper function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Helper function to format percentage
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  // Add header
  doc.setFillColor(36, 94, 79); // Primary color #245e4f
  doc.rect(0, 0, 210, 30, "F");
  
  // Add logo placeholder (in a real application, you would add your logo)
  doc.setFillColor(233, 196, 106); // Accent color #e9c46a
  doc.circle(20, 15, 8, "F");
  
  // Add title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("Extended IRR Analysis Report", 40, 15);
  doc.setFontSize(12);
  doc.text("Generated on " + new Date().toLocaleDateString(), 40, 22);
  
  // Reset text color for content
  doc.setTextColor(51, 51, 51); // Charcoal #333
  
  // Add IRR results section
  doc.setFontSize(16);
  doc.text("IRR Results Summary", 15, 40);
  
  // Add main results table
  const mainTableData = [
    ["Internal Rate of Return (IRR)", formatPercentage(data.irr)],
    ["Extended IRR (XIRR)", data.xirr ? formatPercentage(data.xirr) : "N/A"],
    ["Initial Investment", formatCurrency(data.initialInvestment)],
    ["Total Return", formatCurrency(data.cumulativeReturn)],
    ["Net Profit", formatCurrency(data.netProfit)],
  ];
  
  autoTable(doc, {
    startY: 45,
    head: [["Metric", "Value"]],
    body: mainTableData,
    theme: "grid",
    headStyles: {
      fillColor: [36, 94, 79],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [248, 248, 248],
    },
    margin: { left: 15, right: 15 },
  });
  
  // Add cash flows table
  doc.setFontSize(16);
  doc.text("Cash Flow Details", 15, doc.lastAutoTable.finalY + 15);
  
  const cashFlowsTableData = data.cashFlows.map((cf, index) => [
    `Year ${index + 1}`,
    formatCurrency(cf),
  ]);
  
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    head: [["Period", "Cash Flow"]],
    body: cashFlowsTableData,
    theme: "grid",
    headStyles: {
      fillColor: [36, 94, 79],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [248, 248, 248],
    },
    margin: { left: 15, right: 15 },
  });
  
  // Add interpretation section
  doc.setFontSize(16);
  doc.text("Interpretation", 15, doc.lastAutoTable.finalY + 15);
  
  let interpretation = "";
  const irrPercentage = data.irr * 100;
  
  if (irrPercentage > 15) {
    interpretation = "Excellent: The IRR is above 15%, indicating a strong return on investment that outperforms most market benchmarks.";
  } else if (irrPercentage > 10) {
    interpretation = "Good: The IRR between 10-15% shows a solid return that likely exceeds typical market returns.";
  } else if (irrPercentage > 5) {
    interpretation = "Fair: The IRR between 5-10% represents a moderate return that may be comparable to some market averages.";
  } else {
    interpretation = "Poor: The IRR below 5% suggests a weak return that may underperform compared to market alternatives.";
  }
  
  doc.setFontSize(12);
  doc.text(interpretation, 15, doc.lastAutoTable.finalY + 25, {
    maxWidth: 180,
    align: "justify",
  });
  
  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Footer line
    doc.setDrawColor(36, 94, 79);
    doc.line(15, 280, 195, 280);
    
    // Footer text
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      "IRR Visualizer Pro | www.irrvisualizerpro.com",
      15,
      285
    );
    doc.text(`Page ${i} of ${pageCount}`, 195, 285, { align: "right" });
  }
  
  // Save the PDF
  doc.save("irr-analysis-report.pdf");
};
