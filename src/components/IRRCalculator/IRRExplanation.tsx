
import React from "react";
import { Card } from "@/components/ui/card";

const IRRExplanation: React.FC = () => {
  return (
    <Card className="calculator-card text-left">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-primary">What is Extended Internal Rate of Return (XIRR)?</h3>
        
        <p>
          The Extended Internal Rate of Return (XIRR) is a financial metric that calculates the annual rate of return for investment cash flows that occur at irregular intervals. Unlike the standard IRR calculation, which assumes equal time periods between cash flows, XIRR takes into account the specific dates of each transaction, making it more accurate for real-world investment scenarios.
        </p>
        
        <h4 className="text-lg font-semibold text-primary mt-4">Why XIRR Matters for Investors</h4>
        
        <p>
          XIRR provides a more realistic picture of investment performance when cash flows occur at uneven intervals. This makes it particularly valuable for:
        </p>
        
        <ul className="list-disc pl-5 space-y-2">
          <li>SIP (Systematic Investment Plan) investors who make regular but not necessarily evenly spaced contributions</li>
          <li>Real estate investors with irregular rental income and expenses</li>
          <li>Business owners analyzing projects with uneven cash flow patterns</li>
          <li>Portfolio managers evaluating performance across different investment types</li>
          <li>Financial planners creating retirement or education funding strategies</li>
        </ul>
        
        <h4 className="text-lg font-semibold text-primary mt-4">How XIRR Differs from IRR</h4>
        
        <p>
          The standard IRR calculation assumes that cash flows occur at regular intervals (typically annually). XIRR, on the other hand, accounts for the actual timing of each cash flow, making it more accurate for:
        </p>
        
        <ul className="list-disc pl-5 space-y-2">
          <li>Investments with irregular contribution patterns</li>
          <li>Portfolios with mid-year additions or withdrawals</li>
          <li>Projects with varying cash flow schedules</li>
        </ul>
        
        <p className="mt-4">
          For example, if you make monthly investments but occasionally skip a month or add extra funds, XIRR will provide a more accurate measure of your returns than standard IRR or simple average calculations.
        </p>
        
        <h4 className="text-lg font-semibold text-primary mt-4">Interpreting XIRR Results</h4>
        
        <p>
          When analyzing your XIRR results:
        </p>
        
        <ul className="list-disc pl-5 space-y-2">
          <li>A higher XIRR indicates better investment performance</li>
          <li>Compare your XIRR to relevant benchmarks like market indices or inflation rates</li>
          <li>Consider your XIRR in the context of the investment's risk profile</li>
          <li>Use XIRR alongside other metrics for a comprehensive view of investment performance</li>
        </ul>
        
        <h4 className="text-lg font-semibold text-primary mt-4">Real-World Applications</h4>
        
        <p>
          Our XIRR calculator is particularly useful for:
        </p>
        
        <ul className="list-disc pl-5 space-y-2">
          <li>Evaluating mutual fund or stock portfolio performance</li>
          <li>Analyzing returns on real estate investments</li>
          <li>Assessing business project profitability</li>
          <li>Planning for financial goals like retirement or education</li>
          <li>Comparing performance across different investment options</li>
        </ul>
        
        <p className="mt-4">
          By understanding and utilizing XIRR, investors can make more informed decisions, optimize their investment strategies, and achieve their financial goals more effectively.
        </p>
      </div>
    </Card>
  );
};

export default IRRExplanation;
