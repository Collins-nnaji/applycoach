export const questions = {
  financialGuidance: [
    { id: 1, text: "What is your current level of financial literacy?", type: 'dropdown', options: ['Beginner', 'Intermediate', 'Advanced'] },
    { id: 2, text: "What are your primary financial goals?", type: 'text' },
    { id: 3, text: "How much can you save monthly?", type: 'dropdown', options: ['< $100', '$100 - $500', '$500 - $1000', '> $1000'] },
    { id: 4, text: "What type of financial advice are you seeking?", type: 'dropdown', options: ['Budgeting', 'Saving', 'Investing', 'Debt Management'] },
    { id: 5, text: "Do you have any existing investments?", type: 'dropdown', options: ['Yes', 'No'] },
  ],
  creditScoreTips: [
    { id: 1, text: "What is your current credit score range?", type: 'dropdown', options: ['< 500', '500-600', '600-700', '> 700'] },
    { id: 2, text: "Do you have any outstanding debts?", type: 'dropdown', options: ['Yes', 'No'] },
    { id: 3, text: "Are you currently using a credit card?", type: 'dropdown', options: ['Yes', 'No'] },
    { id: 4, text: "What is your primary financial goal?", type: 'dropdown', options: ['Improve Credit Score', 'Maintain Good Credit Score'] },
    { id: 5, text: "Have you ever defaulted on a loan?", type: 'dropdown', options: ['Yes', 'No'] },
  ],
  savingsPlans: [
    { id: 1, text: "How much can you save monthly?", type: 'dropdown', options: ['< $100', '$100 - $500', '$500 - $1000', '> $1000'] },
    { id: 2, text: "Do you have a savings goal?", type: 'text' },
    { id: 3, text: "How long do you plan to save?", type: 'dropdown', options: ['< 1 year', '1-3 years', '3-5 years', '> 5 years'] },
    { id: 4, text: "Are you saving for a specific purpose?", type: 'dropdown', options: ['Emergency Fund', 'Retirement', 'Education', 'Vacation', 'Other (please specify)'] },
    { id: 5, text: "Do you have an existing savings account?", type: 'dropdown', options: ['Yes', 'No'] },
  ],
  loanOptions: [
    { id: 1, text: "What type of loan are you looking for?", type: 'dropdown', options: ['Personal Loan', 'Home Loan', 'Auto Loan', 'Education Loan'] },
    { id: 2, text: "What is the amount you need?", type: 'text' },
    { id: 3, text: "What is your credit score range?", type: 'dropdown', options: ['< 500', '500-600', '600-700', '> 700'] },
    { id: 4, text: "Do you have any existing loans?", type: 'dropdown', options: ['Yes', 'No'] },
    { id: 5, text: "What is your annual income?", type: 'dropdown', options: ['< $20,000', '$20,000 - $50,000', '$50,000 - $100,000', '> $100,000'] },
  ],
  investmentIdeas: [
    { id: 1, text: "What is your investment experience?", type: 'dropdown', options: ['Beginner', 'Intermediate', 'Advanced'] },
    { id: 2, text: "What type of investments are you interested in?", type: 'dropdown', options: ['Stocks', 'Bonds', 'Real Estate', 'Mutual Funds', 'Cryptocurrency', 'Other (please specify)'] },
    { id: 3, text: "What is your investment horizon?", type: 'dropdown', options: ['< 1 year', '1-3 years', '3-5 years', '> 5 years'] },
    { id: 4, text: "What is your risk tolerance?", type: 'dropdown', options: ['Low', 'Medium', 'High'] },
    { id: 5, text: "What is your investment goal?", type: 'text' },
  ],
};
