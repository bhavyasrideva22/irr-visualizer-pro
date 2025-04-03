
import React, { useState } from "react";
import IRRForm from "@/components/IRRCalculator/IRRForm";
import IRRResults from "@/components/IRRCalculator/IRRResults";
import IRRExplanation from "@/components/IRRCalculator/IRRExplanation";
import EmailDialog from "@/components/IRRCalculator/EmailDialog";
import { calculateIRR, calculateXIRR, calculateCumulativeReturn } from "@/utils/irrCalculator";
import { generatePDF } from "@/utils/pdfGenerator";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calculator, FileText, BadgeIndianRupee, ChartBar } from "lucide-react";

const Index = () => {
  const [irr, setIrr] = useState<number | null>(null);
  const [xirr, setXirr] = useState<number | null>(null);
  const [initialInvestment, setInitialInvestment] = useState<number>(0);
  const [cashFlows, setCashFlows] = useState<number[]>([]);
  const [cumulativeReturn, setCumulativeReturn] = useState<number>(0);
  const [netProfit, setNetProfit] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState<boolean>(false);

  const handleCalculate = (
    initialInvestment: number,
    cashFlows: number[],
    periods: number
  ) => {
    setLoading(true);
    
    // Use setTimeout to prevent UI freezing for complex calculations
    setTimeout(() => {
      const negativeInitialInvestment = -initialInvestment;
      const allCashFlows = [negativeInitialInvestment, ...cashFlows];
      
      // Calculate IRR
      const calculatedIrr = calculateIRR(allCashFlows);
      setIrr(calculatedIrr);
      
      // Calculate XIRR (in a real application, this would use actual dates)
      const calculatedXirr = calculateXIRR(allCashFlows);
      setXirr(calculatedXirr);
      
      // Calculate cumulative return and net profit
      const calculatedCumulativeReturn = calculateCumulativeReturn(cashFlows);
      setCumulativeReturn(calculatedCumulativeReturn);
      setNetProfit(calculatedCumulativeReturn - initialInvestment);
      
      // Store values for PDF and email
      setInitialInvestment(initialInvestment);
      setCashFlows(cashFlows);
      
      setLoading(false);
    }, 300);
  };

  const handleEmailResults = () => {
    setEmailDialogOpen(true);
  };

  const handleDownloadPDF = () => {
    if (irr === null) return;
    
    generatePDF({
      irr,
      xirr,
      initialInvestment,
      cashFlows,
      cumulativeReturn,
      netProfit,
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-gradient-primary text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calculator className="h-8 w-8" />
              <h1 className="text-2xl font-bold">IRR Visualizer Pro</h1>
            </div>
            <Badge className="bg-accent text-charcoal hover:bg-accent/80">
              Financial Tools
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="space-y-6">
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <BadgeIndianRupee className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Extended Internal Rate of Return Calculator</h2>
                </div>
                <p className="mt-2 text-charcoal">
                  Calculate and visualize your investment's Extended IRR to make informed financial decisions.
                </p>
              </div>

              <IRRForm 
                onCalculate={handleCalculate} 
                onEmail={handleEmailResults}
                onDownload={handleDownloadPDF}
                loading={loading}
              />

              {irr !== null && (
                <IRRResults
                  irr={irr}
                  xirr={xirr}
                  initialInvestment={initialInvestment}
                  cashFlows={cashFlows}
                  cumulativeReturn={cumulativeReturn}
                  netProfit={netProfit}
                />
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-6 space-y-6">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-primary text-white p-4">
                  <div className="flex items-center space-x-2">
                    <ChartBar className="h-5 w-5" />
                    <h3 className="font-bold text-white">About IRR</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-charcoal">
                    The Extended Internal Rate of Return (XIRR) is a financial metric that calculates the annualized yield of an investment with multiple, irregularly timed cash flows.
                  </p>
                  <div className="mt-4 flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm text-primary font-medium">
                      Learn more below
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/10 rounded-xl p-4 border border-secondary/20">
                <h3 className="font-medium text-primary">Key Benefits</h3>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-secondary h-5 w-5 rounded-full flex items-center justify-center text-white text-xs mt-0.5 mr-2">
                      ✓
                    </span>
                    <span className="text-sm">Accurate evaluation of investment performance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-secondary h-5 w-5 rounded-full flex items-center justify-center text-white text-xs mt-0.5 mr-2">
                      ✓
                    </span>
                    <span className="text-sm">Compare different investment opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-secondary h-5 w-5 rounded-full flex items-center justify-center text-white text-xs mt-0.5 mr-2">
                      ✓
                    </span>
                    <span className="text-sm">Make informed decisions for your portfolio</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-secondary h-5 w-5 rounded-full flex items-center justify-center text-white text-xs mt-0.5 mr-2">
                      ✓
                    </span>
                    <span className="text-sm">Get professionally formatted reports</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-gray-200" />

        <section className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-2 mb-6">
            <FileText className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Understanding Extended IRR</h2>
          </div>
          <IRRExplanation />
        </section>

        <section className="my-12 bg-white rounded-xl shadow-lg p-6 lg:p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-primary">What is the difference between IRR and XIRR?</h3>
              <p className="mt-2 text-charcoal">
                IRR assumes cash flows occur at regular intervals, while XIRR considers the specific dates of each cash flow, making it more accurate for real-world investments with irregular timing.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-primary">What is a good XIRR rate?</h3>
              <p className="mt-2 text-charcoal">
                A good XIRR depends on the investment type and market conditions. Generally, an XIRR above 12-15% is considered excellent for most investments, 8-12% is good, and 5-8% is average.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-primary">How can I use XIRR to compare investments?</h3>
              <p className="mt-2 text-charcoal">
                XIRR provides a standardized metric to compare investments with different cash flow patterns and timelines. Higher XIRR indicates better performance, though you should also consider risk factors and investment goals.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-primary">Why might my IRR calculation show "error"?</h3>
              <p className="mt-2 text-charcoal">
                IRR calculations may fail to converge if there are multiple sign changes in cash flows, extreme values, or mathematical limitations. In such cases, you might need to adjust your cash flow inputs or use alternative metrics.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">IRR Visualizer Pro</h3>
              <p className="text-sm opacity-80">
                Powerful financial calculators to help you make informed investment decisions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="opacity-80 hover:opacity-100">Home</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100">Calculators</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100">About Us</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="opacity-80 hover:opacity-100">Privacy Policy</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100">Terms of Service</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/20 text-sm opacity-80 text-center">
            <p>© 2025 IRR Visualizer Pro. All rights reserved.</p>
            <p className="mt-1">
              Disclaimer: This calculator is for educational purposes only. Always consult with a financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </footer>

      <EmailDialog
        open={emailDialogOpen}
        onClose={() => setEmailDialogOpen(false)}
        irr={irr}
        xirr={xirr}
        initialInvestment={initialInvestment}
        cashFlows={cashFlows}
        cumulativeReturn={cumulativeReturn}
        netProfit={netProfit}
      />
    </div>
  );
};

export default Index;
