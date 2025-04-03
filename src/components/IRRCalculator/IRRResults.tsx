
import React from "react";
import { Card } from "@/components/ui/card";
import IRRChart from "./IRRChart";
import { Badge } from "@/components/ui/badge";

interface IRRResultsProps {
  irr: number | null;
  xirr: number | null;
  initialInvestment: number;
  cashFlows: number[];
  cumulativeReturn: number;
  netProfit: number;
}

const IRRResults: React.FC<IRRResultsProps> = ({
  irr,
  xirr,
  initialInvestment,
  cashFlows,
  cumulativeReturn,
  netProfit,
}) => {
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

  // Interpret IRR/XIRR
  const getIRRInterpretation = (rate: number) => {
    if (rate > 0.15) return "Excellent";
    if (rate > 0.10) return "Good";
    if (rate > 0.05) return "Fair";
    return "Poor";
  };

  // Get badge color based on interpretation
  const getBadgeColor = (interpretation: string) => {
    switch (interpretation) {
      case "Excellent":
        return "bg-green-600 hover:bg-green-700";
      case "Good":
        return "bg-green-500 hover:bg-green-600";
      case "Fair":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Poor":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  // Generate data for the chart
  const generateChartData = () => {
    const result = [];
    
    // Initial data point
    result.push({
      year: 0,
      value: -initialInvestment,
      cumulativeValue: -initialInvestment,
    });
    
    // Calculate cumulative values separately
    let cumulativeValue = -initialInvestment;
    
    // Add cash flow data points
    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeValue += cashFlows[i];
      result.push({
        year: i + 1,
        value: cashFlows[i],
        cumulativeValue: cumulativeValue,
      });
    }
    
    return result;
  };

  if (irr === null) {
    return null;
  }

  const irrInterpretation = getIRRInterpretation(irr);
  const xirrInterpretation = xirr ? getIRRInterpretation(xirr) : null;
  const chartData = generateChartData();

  return (
    <div className="space-y-6 animate-fade">
      <Card className="calculator-card">
        <h3 className="text-xl font-bold text-primary mb-4">IRR Results</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Internal Rate of Return (IRR)</p>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold text-primary">{formatPercentage(irr)}</p>
                <Badge className={getBadgeColor(irrInterpretation)}>
                  {irrInterpretation}
                </Badge>
              </div>
            </div>
            
            {xirr && (
              <div>
                <p className="text-sm text-gray-500">Extended IRR (XIRR)</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-primary">{formatPercentage(xirr)}</p>
                  {xirrInterpretation && (
                    <Badge className={getBadgeColor(xirrInterpretation)}>
                      {xirrInterpretation}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Initial Investment</p>
              <p className="text-xl font-bold text-charcoal">{formatCurrency(initialInvestment)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Net Profit</p>
              <p className="text-xl font-bold text-charcoal">{formatCurrency(netProfit)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Return</p>
              <p className="text-xl font-bold text-charcoal">{formatCurrency(cumulativeReturn)}</p>
            </div>
          </div>
        </div>
        
        <div className="h-64 md:h-80">
          <IRRChart data={chartData} />
        </div>
      </Card>

      <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/20">
        <h4 className="font-medium text-primary mb-2">What does this mean?</h4>
        <p className="text-sm text-charcoal">
          The Internal Rate of Return (IRR) of {formatPercentage(irr)} represents the annual growth rate of your investment. This means your initial investment of {formatCurrency(initialInvestment)} is effectively growing at {formatPercentage(irr)} per year, resulting in a total profit of {formatCurrency(netProfit)}.
        </p>
        <p className="text-sm text-charcoal mt-2">
          {irrInterpretation === "Excellent" && "This is an excellent return rate that exceeds most market benchmarks."}
          {irrInterpretation === "Good" && "This is a good return rate that meets or exceeds typical market expectations."}
          {irrInterpretation === "Fair" && "This is a fair return rate, close to some market averages."}
          {irrInterpretation === "Poor" && "This return rate is below typical market benchmarks and may warrant reconsidering this investment."}
        </p>
      </div>
    </div>
  );
};

export default IRRResults;
