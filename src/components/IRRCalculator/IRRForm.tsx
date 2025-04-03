
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Download, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface IRRFormProps {
  onCalculate: (
    initialInvestment: number,
    cashFlows: number[],
    periods: number
  ) => void;
  onEmail: () => void;
  onDownload: () => void;
  loading: boolean;
}

const IRRForm: React.FC<IRRFormProps> = ({
  onCalculate,
  onEmail,
  onDownload,
  loading,
}) => {
  const { toast } = useToast();
  const [initialInvestment, setInitialInvestment] = useState<number>(1000000);
  const [periods, setPeriods] = useState<number>(5);
  const [cashFlows, setCashFlows] = useState<string[]>(
    Array(5).fill("300000")
  );

  const handleInitialInvestmentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setInitialInvestment(value);
    } else {
      setInitialInvestment(0);
    }
  };

  const handlePeriodsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 20) {
      setPeriods(value);
      // Adjust cash flows array size
      if (value > cashFlows.length) {
        setCashFlows([...cashFlows, ...Array(value - cashFlows.length).fill("300000")]);
      } else {
        setCashFlows(cashFlows.slice(0, value));
      }
    }
  };

  const handleCashFlowChange = (index: number, value: string) => {
    const newCashFlows = [...cashFlows];
    newCashFlows[index] = value;
    setCashFlows(newCashFlows);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (initialInvestment <= 0) {
      toast({
        title: "Invalid input",
        description: "Initial investment must be greater than zero",
        variant: "destructive",
      });
      return;
    }
    
    const cashFlowNumbers = cashFlows.map((cf) => parseFloat(cf));
    if (cashFlowNumbers.some((cf) => isNaN(cf))) {
      toast({
        title: "Invalid input",
        description: "All cash flows must be valid numbers",
        variant: "destructive",
      });
      return;
    }
    
    onCalculate(initialInvestment, cashFlowNumbers, periods);
  };

  return (
    <Card className="calculator-card">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="input-group">
          <Label htmlFor="initialInvestment" className="input-label">
            Initial Investment (₹)
          </Label>
          <Input
            id="initialInvestment"
            type="number"
            value={initialInvestment}
            onChange={handleInitialInvestmentChange}
            className="input-field"
            placeholder="Enter initial investment amount"
          />
        </div>

        <div className="input-group">
          <Label htmlFor="periods" className="input-label">
            Number of Periods (years)
          </Label>
          <Input
            id="periods"
            type="number"
            min="1"
            max="20"
            value={periods}
            onChange={handlePeriodsChange}
            className="input-field"
            placeholder="Enter number of periods"
          />
        </div>

        <div className="input-group">
          <Label className="input-label">Annual Cash Flows (₹)</Label>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {cashFlows.map((cf, index) => (
              <div key={index} className="flex items-center">
                <span className="mr-2 w-20 text-sm">Year {index + 1}:</span>
                <Input
                  type="number"
                  value={cf}
                  onChange={(e) => handleCashFlowChange(index, e.target.value)}
                  className="input-field"
                  placeholder={`Cash flow for year ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary/90"
            disabled={loading}
          >
            Calculate IRR
          </Button>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 hover:text-primary"
              onClick={onEmail}
              disabled={loading}
            >
              <Mail className="mr-2 h-4 w-4" />
              Email Results
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 hover:text-primary"
              onClick={onDownload}
              disabled={loading}
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default IRRForm;
