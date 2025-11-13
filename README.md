# Renovations Delivered Analytics & Project Management Frontend

> **Backend Repository:** [Renovations Delivered Backend](https://github.com/quinncja/RenovationsBackend)

### Overview

Renovations Delivered, a construction company based out of Chicago, uses Sage 100 Contractor edition as their financial software. With that comes a massive preprogrammed SQL database to store every bit of data imaginable -- contracts, clients, subcontractors, change orders, purchase orders, etc. 
Sage is effective for data entry, but its complex interface combined with the requirement for Windows remote desktop access limits its accessibility and data visualization features. With only two people in the company capable of using Sage, years worth of data was sitting unused, going to waste.

The Renovations Delivered analytics and project management dashboard unlocks this critical data, empowering business administrators and project managers to make data-driven decisions with centralized and intuitive insights.

<br/> 

## Tech Stack
* Framework: React
* Language: JavaScript
* Styling: CSS
* Data Visualization: Nivo Charts
* State Management: React Context
* HTTP Client: Axios
* Authentication: JWT-based token validation powered by Userfront
* Deployment: Vercel


<br/> 

## Dashboard Overview

The dashboard is built around two core sections that transform Sage 100's raw data into actionable insights.

### Home Dashboard - Executive Overview

The home page provides a comprehensive snapshot of business performance through interactive widgets. Each widget aggregates real-time data from the Sage database and can be clicked to drill down into detailed breakdowns.

**Key Widgets:**
- **Annual Revenue Trend** - Year-over-year revenue comparison from 2023 to present
- **Cumulative Revenue Growth** - Month-by-month cumulative revenue tracking for current year vs previous year
- **Monthly Revenue Comparison** - Side-by-side monthly revenue comparison between current and previous year
- **Margin Performance** - Profit margin analysis by phase and overall
- **Phase Completion** - Project status tracking showing open vs closed projects by construction phase
- **Insights** - Top clients, projects, subcontractors, and vendors by total value / spending
- **Employee Performance** - Project manager performance showing total contracts managed and profit margins
- **Aging Summary** - Accounts payable and receivable aging report with buckets for current, 30, 60, and 90+ days overdue, plus current cash position and line of credit usage
- **Data Validation** - Identifies data quality issues for items entered into Sage

<br/>

The screenshot below displays the complete homepage dashboard. All values shown have been randomized for demonstration purposes.

<img width="100%" height="100%" alt="HomePage" src="https://github.com/user-attachments/assets/5f6d4be4-ef34-498f-9c65-bf8184874f51" />


### Job Costing - Project Financial Analysis

The job costing section provides cost tracking and analysis for individual projects, or groupings of projects. Users can filter by project, year, phase, client, location, status, and project manager.

**Key Features:**
- **Historical Trends** - Cost patterns over time with interactive timeline filters
- **Cost Breakdown Charts** - Visual representation of labor, materials, subcontractor, and overhead costs
- **Budget vs. Actual Analysis** - Real-time variance tracking with percentage deviations
- **Line Item Detail** - Drill down to individual transactions and invoices

<br/>

The screenshot below displays the complete job costing page. All values shown have been randomized for demonstration purposes.

<img width="100%" height="100%" alt="Jobcost" src="https://github.com/user-attachments/assets/af54aa36-778a-4a86-be19-d989e0654cbb" />

